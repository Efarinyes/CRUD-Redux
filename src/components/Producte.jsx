import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { borrarProducteAction, obtenirProducteEditar } from '../actions/productoActions';

const Producte = ( {producte} ) => {


    const { nom, preu, id } = producte;
    const dispatch = useDispatch();
    const historia = useHistory(); // Habilita historia per a la seva redirecció

    // Confirmar eliminar producte
    const confirmarEliminarProducte = id => {
        // Demanar confirmació
        Swal.fire({
            title: 'Estas segur de borrar aquest producte?',
            text: "No podras desfer l'acció",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si. Borrar!'
          }).then((result) => {
            if (result.value) {

            // Passar-ho al action
            dispatch(borrarProducteAction(producte.id));  
              
            }
          });       
    };

    // Funció que redirigeix de forma programada
    const redireccionarEdicio = producte => {
        dispatch(obtenirProducteEditar(producte));
        historia.push(`/productes/editar/${id}`)
    }

    return ( 
        <tr>
            <td> {nom} </td>
            <td> <span className='font-weight-bold'> { preu } € </span> </td>
            <td className='acciones'>
                <button 
                    type='button' 
                    className='btn btn-primary mr-2'
                    onClick= { () => redireccionarEdicio(producte) }
                    >
                    Editar</button>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={ () => confirmarEliminarProducte(id)}
                    >Eliminar
                    
                    </button>
            </td>
            </tr>
        
     );
}
 
export default Producte;