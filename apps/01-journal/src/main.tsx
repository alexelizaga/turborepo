import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';
import { BrocodeApps } from './BrocodeApps';
import "./i18n";
import 'ui/styles/styles.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BrocodeApps />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
