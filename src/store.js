import { reducers } from './reducers/index';
import { createStore, applyMiddleware} from 'redux';
import middleware from './middlewares/index';

export default createStore(reducers, applyMiddleware(...middleware));

