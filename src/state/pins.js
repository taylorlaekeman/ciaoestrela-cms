import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  createPinErrors: null,
  isCreatingPin: false,
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
};

export const selectors = {
  isCreatingPin: (state) => state.pins.isCreatingPin,
  selectCreatePinErrors: (state) => state.pins.createPinErrors,
};

export default slice.reducer;
