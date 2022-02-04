import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//import { reducer } from './Reducers'
import { store } from './Reducers';
import App from './App';
import './index.css';


ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
