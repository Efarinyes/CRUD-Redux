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
    INICIAR_EDICIO_PRODUCTE,
    PRODUCTE_EDITAT_EXIT,
    PRODUCTE_EDITAT_ERROR

} from '../types';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';   

// Crear nou producte
export function crearNouProducteAction( producte ) {
    return async (dispatch) => {
        dispatch( afegirProducte() );
        try {
            // Insertar a la API
           await clientAxios.post('/productes', producte);

            // Si tot funciona, actualitzar el State
            dispatch( afegirProducteExit(producte) );
            Swal.fire(
                'Correcte',
                'Producte afegit de manera correcta',
                'success'
            );
        } catch (error) {
            console.log(error);
            // Cambiar State si hi ha algun error
            dispatch( afegirProducteError(true) );
            Swal.fire({
                icon: 'error',
                title:'Ups! Hi ha un error',
                text: 'Torna-ho a probar'
            });
        }
    };
}

const afegirProducte = () => ({
    type: AFEGIR_PRODUCTE,
    payload: true 
});

// Exit al guardar a la bbdd
const afegirProducteExit = (producte) => ({
    type: AFEGIR_PRODUCTE_EXIT,
    payload: producte
});

const afegirProducteError = (estat) => ({
    type: AFEGIR_PRODUCTE_ERROR,
    payload: estat
});

// Funció per descarregar items de la BD
export function obtenirProductesAction() {
    return async (dispatch) => {
        dispatch( descarregarProductes() );
        try {
            const resposta = await clientAxios.get('/productes'); 
            // console.log(resposta.data);
            dispatch( descarregaProductesExit(resposta.data));
        } catch (error) {
            console.log(error);
            dispatch( descarregaProductesError());
        }
    };
}
const descarregarProductes = () => ({
    type: INICIAR_DESCARREGA_ITEMS,
    payload: true
});
const descarregaProductesExit = productes => ({
    type: DESCARREGA_ITEMS_EXIT,
    payload: productes
});
const descarregaProductesError = () => ({
    type: DESCARREGA_ITEMS_ERROR,
    payload: true
});

// Seleccionar un producte per borrar-lo
export function borrarProducteAction(id) {
    return async (dispatch) => {
        dispatch( obtenirProducteEliminar(id) );
        try {
            await clientAxios.delete(`/productes/${id}`);
            dispatch( eliminarProducteExit() );
            // si el producte es eliminat, mostrem Alerta
            Swal.fire(
                'Borrat amb èxit!',
                'Producte borrat correctament',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProducteError());
        }
    };
} 
const obtenirProducteEliminar = id => ({
    type: OBTENIR_PRODUCTE_ELIMINAR,
    payload: id
});

const eliminarProducteExit = () => ({
    type: PRODUCTE_ELIMINAT_EXIT
    
});

const eliminarProducteError = () => ({
    type: PRODUCTE_ELIMINAT_ERROR,
    payload: true
});

// Passem un producte a Edició - No ens comuniquem amb l'API
export function obtenirProducteEditar(producte) {
    return (dispatch) => {
        dispatch( obtenirProducteEditarAction(producte) );
    };
}
const obtenirProducteEditarAction = producte => ({
    type: OBTENIR_PRODUCTE_EDITAR,
    payload: producte
});

// Editar un producte tan a la API com al State
export function editarProducteAction(producte) {
    return async (dispatch) => {
        dispatch( editarProducte());

        try {
        await clientAxios.put(`/productes/${producte.id}`, producte);

        dispatch(editarProducteExit(producte));
        
        } catch (error) {
            console.log(error);
            dispatch(editarProducteError());
        }    
    };
}
const editarProducte = () => ({
    type: INICIAR_EDICIO_PRODUCTE
    
});

const editarProducteExit = producte => ({
    type: PRODUCTE_EDITAT_EXIT,
    payload: producte
});
const editarProducteError = () => ({
    type: PRODUCTE_EDITAT_ERROR,
    payload: true
});