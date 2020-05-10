import { ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import api from 'services/api';
import { selectors as authSelectors } from 'state/auth';

const initialState = {
  isFetchingOrders: false,
  orders: {},
};

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrders: (state) => ({ ...state, isFetchingOrders: true }),
    fetchOrdersFailure: (state) => ({ ...state, isFetchingOrders: false }),
    fetchOrdersSuccess: (state, action) => ({
      ...state,
      isFetchingOrders: false,
      orders: action.payload,
    }),
  },
});

export const { actions } = slice;

export const epics = {
  fetchOrders: (action$, state$) =>
    action$.pipe(
      ofType(actions.fetchOrders),
      mergeMap(() => {
        const state = state$.value;
        const token = authSelectors.selectToken(state);
        return from(api.getOrders(token)).pipe(
          map((orders) => actions.fetchOrdersSuccess(orders)),
          catchError((error) => of(actions.fetchOrdersFailure(error)))
        );
      })
    ),
};

export const selectors = {
  isFetchingOrders: (state) => state.orders.isFetchingOrders,
  selectOrders: (state) => state.orders.orders,
};

export default slice.reducer;
