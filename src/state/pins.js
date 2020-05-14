import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  createPinErrors: null,
  fetchPinsErrors: null,
  isCreatingPin: false,
  isFetchingPins: false,
  pins: {},
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
    createPinSuccess: (state) => ({
      ...state,
      createPinErrors: null,
      isCreatingPin: false,
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
    setStatus: (state) => state,
    setStatusFailure: (state) => state,
    setStatusSuccess: (state, action) => {
      const { id, isAvailable } = action.payload;
      return {
        ...state,
        pins: {
          ...state.pins,
          [id]: {
            ...state.pins[id],
            isAvailable,
          },
        },
      };
    },
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
          payload: { cost, image, name },
        } = action;
        return from(api.createPin(token, name, cost, image)).pipe(
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
          catchError((error) => of(actions.setStatusFailure(error)))
        );
      })
    ),
};

export const selectors = {
  isCreatingPin: (state) => state.pins.isCreatingPin,
  isFetchingPins: (state) => state.pins.isFetchingPins,
  selectCreatePinErrors: (state) => state.pins.createPinErrors,
  selectFetchPinsErrors: (state) => state.pins.fetchPinsErrors,
  selectPins: (state) => state.pins.pins,
};

export default slice.reducer;
