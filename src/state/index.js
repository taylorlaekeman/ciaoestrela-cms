import { configureStore } from '@reduxjs/toolkit';

import orders from 'state/orders';

const store = configureStore({
  reducer: orders.reducer,
});

export default store;
