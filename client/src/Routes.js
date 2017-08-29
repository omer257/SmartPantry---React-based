import React from 'react';
import Watson from './Ingredients/Watson';
import App from './App';
import Header from './Common/Header';
import _404 from './404';
import ingredientsList from './Ingredients/ingredientsList';
import AddIngredient from './Ingredients/AddIngredient';
import About from './About/';
import RecipesList from './Recipes/RecipesList';
import RegLogin from './RegLogin';
import firebase from 'firebase'
import {Switch, Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (firebase.auth().currentUser
    ? (<Component {...props}/>)
    : (<Redirect
      to={{
      pathname: '/RegLogin',
      state: {
        from: props.location
      }
    }}/>))}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const Routes = () => (
  <div>
    <Route name="Header" component={Header}/>
              <Switch>
              <Route name="home" exact path='/' component={App}/>
              <Route name="About" exact path='/About' component={About}/>
              <Route name="ingredientsList" exact path='/ingredientsList' component={ingredientsList}/>
              <Route name="Watson" exact path='/Watson' component={Watson}/>
              <Route name="RecipesList" exact path='/RecipesList' component={RecipesList}/>
           <Route name="RegLogin" exact path='/RegLogin' component={RegLogin}/>
              <Route name="AddIngredient" exact path='/AddIngredient' component={AddIngredient}/>
              <Route path="/AddIngredient/:name" component={AddIngredient}/>
              <Route path="*" component={_404} />
              </Switch>
  </div>
)
export default Routes;
