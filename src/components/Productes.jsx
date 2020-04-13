import React, { Fragment, useEffect } from 'react';
import Producte from './Producte';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenirProductesAction } from '../actions/productoActions';


const Productes = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        // Consultar API
        const carregarProductes = () => dispatch(obtenirProductesAction());
        carregarProductes();
    },[dispatch]);

    const productes = useSelector( state => state.productes.productes );
    const error = useSelector( state => state.productes.error);
    const carregant = useSelector( state => state.productes.loading);
    return ( 
        <Fragment>
            <h2 className='text-center my-5'> Llistat de Productes</h2>
            { error ? <p className='alert alert-danger font-weight-bold text-center mt-4'>Ups!! Hi ha un error</p> : null}
            { carregant ? <p className='text-center'> carregant </p> : null}
            <table className='table table-striped'>
                <thead className="bg-primary table-primary">
                    <tr>
                        <th scope='col'>Nom</th>
                        <th scope='col'>Preu</th>
                        <th scope='col'>Accions</th>
                    </tr>
                </thead>
                <tbody>
                    { productes.length === 0 ? 'No hi ha productes' : (
                        productes.map(producte => (
                            <Producte 
                                key={producte.id}
                                producte={producte}
                            />
                        ))
                    )}
                    
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Productes;
