import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  createPinErrors: null,
  fetchPinsErrors: null,
  imageUrl: null,
  isCreatingPin: false,
  isFetchingPins: false,
  isSettingStatus: {},
  isUpdatingPin: false,
  isUploadingImage: false,
  pins: {},
  updatePinErrors: null,
};

const slice = createSlice({
  initialState,
  name: 'pins',
  reducers: {
    createPin: (state) => ({ ...state, isCreatingPin: true }),
    createPinFailure: (state, action) => ({
      ...state,
      createPinErrors: action.payload,
      isCreatingPin: false,
    }),
    createPinSuccess: (state, action) => ({
      ...state,
      createPinErrors: null,
      isCreatingPin: false,
      pins: {
        ...state.pins,
        [action.payload.id]: action.payload,
      },
    }),
    fetchPins: (state) => ({ ...state, isFetchingPins: true }),
    fetchPinsFailure: (state, action) => ({
      ...state,
      fetchPinsErrors: action.payload,
      isFetchingPins: false,
    }),
    fetchPinsSuccess: (state, action) => ({
      ...state,
      fetchPinsErrors: null,
      isFetchingPins: false,
      pins: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      isSettingStatus: {
        ...state.isSettingStatus,
        [action.payload.id]: true,
      },
    }),
    setStatusFailure: (state, action) => ({
      ...state,
      isSettingStatus: {
        ...state.isSettingStatus,
        [action.payload.id]: false,
      },
    }),
    setStatusSuccess: (state, action) => {
      const { id, isAvailable } = action.payload;
      return {
        ...state,
        isSettingStatus: {
          ...state.isSettingsStatus,
          [id]: false,
        },
        pins: {
          ...state.pins,
          [id]: {
            ...state.pins[id],
            isAvailable,
          },
        },
      };
    },
    updatePin: (state) => ({
      ...state,
      isUpdatingPin: true,
    }),
    updatePinFailure: (state, action) => ({
      ...state,
      isUpdatingPin: false,
      updatePinErrors: action.payload,
    }),
    updatePinSuccess: (state, action) => ({
      ...state,
      pins: {
        ...state.pins,
        [action.payload.id]: action.payload
      },
      updatePinErrors: null,
    }),
    uploadImage: (state) => ({
      ...state,
      isUploadingImage: true,
    }),
    uploadImageFailure: (state) => ({
      ...state,
      isUploadingImage: false,
    }),
    uploadImageSuccess: (state, action) => ({
      ...state,
      imageUrl: action.payload.url,
      isUploadingImage: false,
    }),
  },
});

export const { actions } = slice;

export const epics = {
  createPin: (action$, state$) =>
    action$.pipe(
      ofType(actions.createPin),
      mergeMap((action) => {
        const token = authSelectors.selectToken(state$.value);
        const {
          payload: { cost, imageUrl, name },
        } = action;
        return from(api.createPin(token, name, cost, imageUrl)).pipe(
          map((pin) => actions.createPinSuccess(pin)),
          catchError((error) => of(actions.createPinFailure(error)))
        );
      })
    ),

  fetchPins: (action$, state$) =>
    action$.pipe(
      ofType(actions.fetchPins),
      mergeMap(() => {
        const token = authSelectors.selectToken(state$.value);
        return from(api.getPins(token)).pipe(
          map((pins) => actions.fetchPinsSuccess(pins)),
          catchError((error) => of(actions.fetchPinsFailure(error)))
        );
      })
    ),

  setStatus: (action$, state$) =>
    action$.pipe(
      ofType(actions.setStatus),
      mergeMap((action) => {
        const { id, status } = action.payload;
        const token = authSelectors.selectToken(state$.value);
        return from(api.setPinStatus(token, id, status)).pipe(
          map((pin) => actions.setStatusSuccess(pin)),
          catchError((error) => of(actions.setStatusFailure({ error, id })))
        );
      })
    ),

  updatePin: (action$, state$) =>
    action$.pipe(
      ofType(actions.updatePin),
      mergeMap((action) => {
        const token = authSelectors.selectToken(state$.value);
        const {
          payload: { cost, id, imageUrl, name },
        } = action;
        console.log(action.payload);
        return from(api.updatePin(token, id, name, cost, imageUrl)).pipe(
          map((pin) => actions.updatePinSuccess(pin)),
          catchError((error) => of(actions.updatePinFailure(error)))
        );
      })
    ),

  uploadImage: (action$, state$) =>
    action$.pipe(
      ofType(actions.uploadImage),
      mergeMap((action) => {
        const image = action.payload;
        const token = authSelectors.selectToken(state$.value);
        return from(api.uploadImage(token, image)).pipe(
          map((imageUrl) => actions.uploadImageSuccess(imageUrl)),
          catchError((error) => of(actions.uploadImageFailure(error)))
        );
      })
    ),
};

export const selectors = {
  isCreatingPin: (state) => state.pins.isCreatingPin,
  isFetchingPins: (state) => state.pins.isFetchingPins,
  isSettingStatus: (pinId) => (state) =>
    state.pins.isSettingStatus[pinId] || false,
  isUploadingImage: (state) => state.pins.isUploadingImage,
  selectCreatePinErrors: (state) => state.pins.createPinErrors,
  selectFetchPinsErrors: (state) => state.pins.fetchPinsErrors,
  selectImageUrl: (state) => state.pins.imageUrl,
  selectPins: (state) => state.pins.pins,
  selectPin: (id) => (state) => state.pins.pins[id],
  selectUpdatePinErrors: (state) => state.pins.updatePinErrors,
};

export default slice.reducer;
