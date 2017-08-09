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
import {Link} from 'react-router-dom'; //Calling link to bind with router
import firebase from 'firebase'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
 

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
    <div>
      <Header/><br/><br/>
      {/*<ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/ingredientsList">Protected Page</Link>
        </li>
      </ul>
      <AuthButton/>*/}
      <Route name="home" exact path='/' component={App}/>
      <Route name="About" exact path='/About' component={About}/>
      <Route path="/public" component={Public}/>
      <Route path="/RegLogin" component={RegLogin}/>
      <PrivateRoute path="/ingredientsList" component={ingredientsList}/>
      <PrivateRoute path="/Watson" component={Watson}/>
      <PrivateRoute path="/RecipesList" component={RecipesList}/>
      <PrivateRoute path="/AddIngredient" component={AddIngredient}/>
    </div>
  </div>
)

// <Route name="ingredientsList" exact path='/ingredientsList'
// component={ingredientsList}/> <Route name="Watson" exact path='/Watson'
// component={Watson}/> <Route name="RecipesList" exact path='/RecipesList'
// component={RecipesList}/> <Route name="RegLogin" exact path='/RegLogin'
// component={RegLogin}/> <Route name="AddIngredient" exact
// path='/AddIngredient' component={AddIngredient}/> <Route
// path="/AddIngredient/:name" component={AddIngredient}/> <Route path="*"
// component={_404} />*/}
export default Routes;
