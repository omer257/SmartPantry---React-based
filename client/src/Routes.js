import React from 'react';
import Watson from './Ingredients/Watson';
import App from './App';
import Header from './Common/Header';
import _404 from './404';
import ingredientsList from './Ingredients/ingredientsList';
import AddIngredient from './Ingredients/AddIngredient';
import About from './About/';
import RecipesList from './Recipes/RecipesList';
import DB from './DB';
import Fire from './Fire';



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
            <Route name="Fire" exact path='/Fire' component={Fire}/>
            <Route name="AddIngredient" exact path='/AddIngredient' component={AddIngredient}/>
            <Route path="/AddIngredient/:name" component={AddIngredient}/>
            <Route path="*" component={_404} />
            </Switch>
        </div>
    </div>
)

export default Routes;
