import { combineReducers } from 'redux';
import productesReducer from './productesReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    productes: productesReducer,
    alerta: alertaReducer
});