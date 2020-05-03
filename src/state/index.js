import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import authReducer from 'state/auth';
import orderReducer, { epics as orderEpics } from 'state/orders';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  middleware: [epicMiddleware],
  reducer: combineReducers({ auth: authReducer, orders: orderReducer }),
});

const epics = combineEpics(...Object.values(orderEpics));
epicMiddleware.run(epics);

export default store;
