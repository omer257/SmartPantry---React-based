import React from 'react';
import App from './App';
import Form from './Form';
import Header from './Header';
import TodoList from './TodoList';
import {Switch, Route, Redirect} from 'react-router-dom';

const Routes = () => (
    <div className="container">
        <Header/>
        <Switch>
            <Route name="home" exact path='/' component={App}/>
            <Route name="TodoList" exact path='/TodoList' component={TodoList}/>
            <Route name="form" exact path='/form' component={Form}/>
            <Route path="*" component={App}/>
        </Switch>
    </div>
)

export default Routes;
