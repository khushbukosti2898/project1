 
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {loginReducer} from './login.reducer';

const rootReducer = combineReducers({
  loginReducer
});

export default rootReducer;