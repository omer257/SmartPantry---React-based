import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'mobx-react';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import Routes from './Routes';
import stores from './stores';
import './App.css'; 

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const Providerstores = {
    routing: routingStore,
    ingredientsStore:stores.ingredientsStore,
    store:stores.AutoCompleteStore,
    AuthStore:stores.AuthStore
};



ReactDOM.render(
<Provider {...Providerstores}>
    <Router history={history}>
        <Routes />
    </Router>
</Provider>, document.getElementById('root'));