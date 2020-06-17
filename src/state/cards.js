import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  cards: {},
  createCardErrors: {},
  fetchCardsError: null,
  imageUrl: null,
  hasFetched: false,
  isCreatingCard: false,
  isFetchingCards: false,
  isSettingStatus: {},
  isUpdating: false,
  isUploadingImage: false,
  updateErrors: {},
};

const slice = createSlice({
  initialState,
  name: 'cards',
  reducers: {
    createCard: (state) => ({ ...state, isCreatingCard: true }),

    createCardFailure: (state, action) => ({
      ...state,
      createCardErrors: action.payload,
      isCreatingCard: false,
    }),

    createCardSuccess: (state, action) => ({
      ...state,
      createCardErrors: {},
      isCreatingCard: false,
      cards: {
        ...state.cards,
        [action.payload.id]: action.payload,
      },
    }),

    fetchCards: (state) => ({
      ...state,
      fetchCardsError: null,
      isFetchingCards: true,
    }),

    fetchCardsFailure: (state, action) => ({
      ...state,
      fetchCardsError: action.payload,
      hasFetched: true,
      isFetchingCards: false,
    }),

    fetchCardsSuccess: (state, action) => ({
      ...state,
      cards: action.payload,
      hasFetched: true,
      isFetchingCards: false,
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

    setStatusSuccess: (state, action) => ({
      ...state,
      cards: {
        ...state.cards,
        [action.payload.id]: {
          ...state.cards[action.payload.id],
          isAvailable: action.payload.isAvailable,
        },
      },
      isSettingStatus: {
        ...state.isSettingStatus,
        [action.payload.id]: false,
      },
    }),

    updateCard: (state) => ({ ...state, isUpdating: true }),

    updateCardFailure: (state, action) => ({
      ...state,
      updateErrors: action.payload,
      isUpdating: false,
    }),

    updateCardSuccess: (state, action) => ({
      ...state,
      updateErrors: {},
      isUpdating: false,
      cards: {
        ...state.cards,
        [action.payload.id]: action.payload,
      },
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
  createCard: (action$, state$) =>
    action$.pipe(
      ofType(actions.createCard),
      mergeMap((action) => {
        const token = authSelectors.selectToken(state$.value);
        const { cost, imageUrl, name } = action.payload;
        return from(api.createCard(token, name, cost, imageUrl)).pipe(
          map((card) => actions.createCardSuccess(card)),
          catchError((error) => of(actions.createCardFailure(error)))
        );
      })
    ),

  fetchCards: (action$, state$) =>
    action$.pipe(
      ofType(actions.fetchCards),
      mergeMap(() => {
        const token = authSelectors.selectToken(state$.value);
        return from(api.getCards(token)).pipe(
          map((cards) => actions.fetchCardsSuccess(cards)),
          catchError((error) => of(actions.fetchCardsFailure(error)))
        );
      })
    ),

  setStatus: (action$, state$) =>
    action$.pipe(
      ofType(actions.setStatus),
      mergeMap((action) => {
        const { id, status } = action.payload;
        const token = authSelectors.selectToken(state$.value);
        return from(api.setCardStatus(token, id, status)).pipe(
          map((card) => actions.setStatusSuccess(card)),
          catchError((error) => of(actions.setStatusFailure({ error, id })))
        );
      })
    ),

  updateCard: (action$, state$) =>
    action$.pipe(
      ofType(actions.updateCard),
      mergeMap((action) => {
        const token = authSelectors.selectToken(state$.value);
        const { cost, id, imageUrl, name } = action.payload;
        return from(api.updateCard(token, id, name, cost, imageUrl)).pipe(
          map((card) => actions.updateCardSuccess(card)),
          catchError((error) => of(actions.updateCardFailure(error)))
        );
      })
    ),

  uploadImage: (action$, state$) =>
    action$.pipe(
      ofType(actions.uploadImage),
      mergeMap((action) => {
        const image = action.payload;
        const token = authSelectors.selectToken(state$.value);
        return from(api.uploadCardImage(token, image)).pipe(
          map((imageUrl) => actions.uploadImageSuccess(imageUrl)),
          catchError((error) => of(actions.uploadImageFailure(error)))
        );
      })
    ),
};

// selectors

export const hasFetched = (state) => state.cards.hasFetched;

export const isCreatingCard = (state) => state.cards.isCreatingCard;

export const isSaving = (state) =>
  state.cards.isCreatingCard || state.cards.isUpdating;

export const isSettingStatus = (state) => state.cards.isSettingStatus;

export const isUploadingImage = (state) => state.cards.isUploadingImage;

export const selectCards = (state) => state.cards.cards;

export const selectCreateErrors = (state) => state.cards.createCardErrors;

export const selectImageUrl = (state) => state.cards.imageUrl;

export const selectUpdateErrors = (state) => state.cards.updateErrors;

export const selectors = {
  hasFetched,
  isCreatingCard,
  isSettingStatus,
  isSaving,
  isUploadingImage,
  selectCards,
  selectCreateErrors,
  selectImageUrl,
  selectUpdateErrors,
};

export default slice.reducer;
