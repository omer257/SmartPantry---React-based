import React from 'react';
import App from './App';
import Form from './Form';
import Header from './Header';
import TodoList from './TodoList';
import About from './About/';
import {Switch, Route, Redirect} from 'react-router-dom';

const Routes = () => (
    <div className="container">
        <Header/>
        <Switch>
            <Route name="home" exact path='/' component={App}/>
            <Route name="About" exact path='/About' component={About}/>
            <Route name="TodoList" exact path='/TodoList' component={TodoList}/>
            <Route name="form" exact path='/form' component={Form}/>
        </Switch>
    </div>
)

export default Routes;
