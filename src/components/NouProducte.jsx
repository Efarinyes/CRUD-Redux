import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importem Actions de Redux
import  { crearNouProducteAction} from '../actions/productoActions';
import { mostrarAlerta, amagarAlertaAction } from '../actions/aleretaActions';

const NouProducte = ({history}) => {

    // State del component. Particular
    const [ nom, guardarNom ] = useState('');
    const [ preu, guardarPreu ] = useState(0);

    // Fem servir useDispatch que ens retorna una funció
    const dispatch = useDispatch();

    // Accedim al State del Store ( State General )
    const carregant = useSelector( state => state.productes.loading);
    const error = useSelector( state => state.productes.error);
    const alerta = useSelector( state => state.alerta.alerta);
   // console.log(carregant);

    // Cridem al action de producteActions
    const afegirProducte = (producte) => dispatch( crearNouProducteAction(producte) );

    // Quan fem sumbit a nou producte
    const submitNouProducte = e => {
        e.preventDefault();

        // Validar formulari
        if ( nom.trim() === '' || preu <= 0 ) {
            const alerta = {
                msg: 'Tots els camps són necessaris',
                classes: 'alert alert-danger text-center text-uppercase p3'
            };
           dispatch(mostrarAlerta(alerta));
           return;
        }
        // Que no hi hagi errors
        dispatch(amagarAlertaAction());
        // Crear nou producte
        afegirProducte(
            {
                nom, 
                preu
            }
        );
        history.push('/');
    };

    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 container font-weight-bold'> Afegir nou producte </h2>
                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null}
                        <form
                            onSubmit={submitNouProducte}
                        >
                            <div className='form-group'>
                                <label> Nom Producte </label>
                                <input 
                                    type="text"
                                    className='form-control'
                                    placeholder='Nom del Producte...'
                                    name='nom'
                                    value={nom}
                                    onChange={ e => guardarNom(e.target.value)}
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
                                    onChange = { e => guardarPreu( Number(e.target.value) )}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                                    Afegir Producte
                                </button>
                        </form>
                        { carregant ? <p>Carregant...</p> : null }
                        { error ? <p className='alert alert-danger p2 mt-4 text-center'>Ups! Hi ha un error</p> : null} 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NouProducte;
