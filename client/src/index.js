import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'mobx-react';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import Routes from './Routes';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
    // Key can be whatever you want
    routing: routingStore,
    // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
<Provider {...stores}>
    <Router history={history}>
        <Routes/>
    </Router>
</Provider>, document.getElementById('root'));