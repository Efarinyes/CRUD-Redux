import {
    AFEGIR_PRODUCTE,
    AFEGIR_PRODUCTE_EXIT,
    AFEGIR_PRODUCTE_ERROR,
    INICIAR_DESCARREGA_ITEMS,
    DESCARREGA_ITEMS_EXIT,
    DESCARREGA_ITEMS_ERROR,
    OBTENIR_PRODUCTE_ELIMINAR,
    PRODUCTE_ELIMINAT_EXIT,
    PRODUCTE_ELIMINAT_ERROR,
    OBTENIR_PRODUCTE_EDITAR,
    PRODUCTE_EDITAT_EXIT,
    PRODUCTE_EDITAT_ERROR

} from '../types';

// Cada Reducer te el seu propi State
const initialState = {
    productes: [],
    error: null,
    loading: false,
    producteeliminar: null,
    producteeditar: null
};

export default function( state = initialState, action ) {
    switch(action.type) {
        case INICIAR_DESCARREGA_ITEMS:
        case AFEGIR_PRODUCTE:
            return {
                ...state,
                loading: action.payload
            };
        case AFEGIR_PRODUCTE_EXIT:
            return {
                ...state,
                loading: false,
                productes: [...state.productes, action.payload ]
            }; 
        case AFEGIR_PRODUCTE_ERROR:
        case DESCARREGA_ITEMS_ERROR:
        case PRODUCTE_ELIMINAT_ERROR:
        case PRODUCTE_EDITAT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DESCARREGA_ITEMS_EXIT:
            return {
                ...state,
                loading: false,
                error: null,
                productes: action.payload
            };
        case OBTENIR_PRODUCTE_ELIMINAR:
            return {
                ...state,
                producteeliminar: action.payload
            };  
        case PRODUCTE_ELIMINAT_EXIT:
            return {
                ...state,
                productes: state.productes.filter( producte => producte.id !== state.producteeliminar ),
                producteeliminar: null
            };
        case OBTENIR_PRODUCTE_EDITAR:
            return {
                ...state,
                producteeditar: action.payload
            };
        case PRODUCTE_EDITAT_EXIT:
            return {
                ...state,
                producteeditar: null,
                productes: state.productes.map( producte => 
                        producte.id === action.payload.id ? producte = action.payload : producte
                    )
            };      
        
        default:
            return state;
    }
}

