import React from 'react';
import Watson from './Ingredients/Watson';
import App from './App';
import Form from './Ingredients/Form';
import Header from './Common/Header';
import ingredientsList from './Ingredients/ingredientsList';
import AddIngredient from './Ingredients/AddIngredient';
import About from './About/';
import RecipesList from './Recipes/RecipesList';
import DB from './DB';

import {Switch, Route} from 'react-router-dom';

const Routes = () => (
    <div>
        <Header/>
        <div className="container">
            <Switch>
            <Route name="home" exact path='/' component={App}/>
            <Route name="About" exact path='/About' component={About}/>
            <Route name="ingredientsList" exact path='/ingredientsList' component={ingredientsList}/>
            <Route name="Watson" exact path='/Watson' component={Watson}/>
            <Route name="RecipesList" exact path='/RecipesList' component={RecipesList}/>
            <Route name="DB" exact path='/DB' component={DB}/>
            <Route name="AddIngredient" exact path='/AddIngredient' component={AddIngredient}/>
            
            <Route name="form" exact path='/form' component={Form}/>
            </Switch>
        </div>
    </div>
)

export default Routes;
