import {
    MOSTRAR_ALERTA,
    AMAGAR_ALERTA

} from '../types';

const initialState = {
    alerta: null
};

export default function( state = initialState, action) {
    switch(action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            };
        case AMAGAR_ALERTA:
            return {
                ...state,
                alerta: null
            };

        default:
            return state;
    }
}

