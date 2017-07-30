import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routes from './Routes';
import Header from './Header';
import {BrowserRouter} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <BrowserRouter>
        <div>
            <Header />
            <Routes/>
        </div>
      </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
