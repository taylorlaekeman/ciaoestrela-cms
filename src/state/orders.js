import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFetchingOrders: false,
};

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrders: (state) => ({ ...state, isFetchingOrders: true }),
    fetchOrdersFailure: (state) => ({ ...state, isFetchingOrders: false }),
    fetchOrdersSuccess: (state) => ({ ...state, isFetchingOrders: false }),
  },
});

export const { actions } = orders;
export const selectors = {
  isFetchingOrders: (state) => state.isFetchingOrders,
};

export default orders;
