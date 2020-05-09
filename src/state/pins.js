import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  isCreatingPin: false,
};

const slice = createSlice({
  initialState,
  name: 'pins',
  reducers: {
    createPin: (state, action) => ({ ...state, isCreatingPin: true }),
    createPinFailure: (state) => ({ ...state, isCreatingPin: false }),
    createPinSuccess: (state) => ({ ...state, isCreatingPin: false }),
  },
});

export const { actions } = slice;

export const epics = {
  createPin: (action$, state$) =>
    action$.pipe(
      ofType(actions.createPin),
      mergeMap((action) => {
        const token = authSelectors.selectToken(state$.value);
        const { payload: { cost, name } } = action;
        return from(api.createPin(token, name, cost)).pipe(
          map((pin) => actions.createPinSuccess(pin)),
          catchError((error) => of(actions.createPinFailure(error))),
        );
      })
    ),
};

export const selectors = {
  isCreatingPin: (state) => state.pins.isCreatingPin,
};

export default slice.reducer;
