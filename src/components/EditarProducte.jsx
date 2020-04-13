import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProducteAction } from '../actions/productoActions';
import { useHistory } from 'react-router-dom';

const EditarProducte = () => {

    const dispatch = useDispatch();
    const historia = useHistory(); // Habilita historia per a la seva redirecció

    // Producte a Editar
    const [ producte, guardarProducte ] = useState({
        nom: '',
        preu: ''
    });

    const producteeditar = useSelector( state => state.productes.producteeditar);
   // if (!producte) return null;

   useEffect( () => {
        guardarProducte(producteeditar);
   }, [producteeditar]);
    const { nom, preu } = producte; 

    const onChangeFormulari = e => {
        guardarProducte({
            ...producte,
            [ e.target.name] : e.target.value
        });
    };

    const submitEditarProducte = e => {
        e.preventDefault();
       dispatch(editarProducteAction(producte));
       historia.push('/');
    };


    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 container font-weight-bold'> Editar producte </h2>
                        <form
                            onSubmit = {submitEditarProducte}
                        >
                            <div className='form-group'>
                                <label> Nom Producte </label>
                                <input 
                                    type="text"
                                    className='form-control'
                                    placeholder='Nom del Producte...'
                                    name='nom'
                                    value={nom}
                                    onChange={onChangeFormulari}
                                    
                                />
                            </div>
                            <div className='form-group'>
                                <label> Preu Producte </label>
                                <input 
                                    type="number"
                                    className='form-control'
                                    placeholder='Preu del Producte...'
                                    name='preu'
                                    value={preu}
                                    onChange={onChangeFormulari}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                    Guardar Canvis
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducte;
