/**
 * @author Sotirios Karageorgopoulos
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/routes';
import {store} from './reduxStore';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <App />
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
