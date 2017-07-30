import React from 'react';
import App from './App';
import Form from './Form';
import {Switch, Route, Redirect} from 'react-router-dom';

const Routesss = () => (
    <div className="container">
        <Switch>
            <Route name="home" exact path='/' component={App} />
            <Route name="form" exact path='/form' component={Form} />
            <Route path="*" component={App}/>
        </Switch>
    </div>
)

export default Routesss;
