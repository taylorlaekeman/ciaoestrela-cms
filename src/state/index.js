import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import authReducer from 'state/auth';
import cardReducer, { epics as cardEpics } from 'state/cards';
import orderReducer, { epics as orderEpics } from 'state/orders';
import pinReducer, { epics as pinEpics } from 'state/pins';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  middleware: [epicMiddleware],
  reducer: combineReducers({
    auth: authReducer,
    cards: cardReducer,
    orders: orderReducer,
    pins: pinReducer,
  }),
});

const epics = combineEpics(
  ...Object.values(cardEpics),
  ...Object.values(orderEpics),
  ...Object.values(pinEpics)
);
epicMiddleware.run(epics);

export default store;
