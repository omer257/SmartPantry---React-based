import React from 'react';
import Watson from './Watson';
import App from './App';
import Form from './Form';
import Header from './Header';
import ingredientsList from './ingredientsList';
import About from './About/';
import food from './Food';
import AddItem from './AddItem';
import DB from './DB';

import {Switch, Route} from 'react-router-dom';

const Routes = () => (
    <div className="container">
        <Header/>
        <Switch>
            <Route name="home" exact path='/' component={App}/>
            <Route name="About" exact path='/About' component={About}/>
            <Route name="ingredientsList" exact path='/ingredientsList' component={ingredientsList}/>
            <Route name="Watson" exact path='/Watson' component={Watson}/>
            <Route name="food" exact path='/food' component={food}/>
            <Route name="AddItem" exact path='/AddItem' component={AddItem}/>
            <Route name="DB" exact path='/DB' component={DB}/>
            
            <Route name="form" exact path='/form' component={Form}/>
        </Switch>
    </div>
)

export default Routes;
