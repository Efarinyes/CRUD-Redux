import {
    MOSTRAR_ALERTA,
    AMAGAR_ALERTA

} from '../types';

// Mostrar Alerta
export function mostrarAlerta(alerta) {
    return (dispatch) => {
            dispatch(crearAlerta(alerta));
        }
    }
 
 const crearAlerta = alerta => ({
     type: MOSTRAR_ALERTA,
     payload: alerta
 });

 // Amagar Alerta
 export function amagarAlertaAction() {
    return (dispatch) => {
        dispatch(amagarAlerta());
    }
 }
 const amagarAlerta = () => ({
     type: AMAGAR_ALERTA
 })