import React from 'react';
import Header from './components/Header';
import Productes from './components/Productes';
import NouProducte from './components/NouProducte';
import EditarProducte from './components/EditarProducte';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
      <Header />
      <div className='container mt-5'>
        <Switch>
          <Route exact path='/' component = { Productes } />
          <Route exact path='/productes/nou' component = { NouProducte } />
          <Route exact path='/productes/editar/:id' component = { EditarProducte } />
        </Switch>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
