import React from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import {inject, observer} from 'mobx-react';

@inject('UserStore')
@observer
class App extends React.Component {
   
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Food App</Link>

          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link to="/AddIngredient">AddIngredient</Link>
              </li>
              <li>
                <Link to="/ingredientsList">My ingredients</Link>
              </li>
              <li>
                <Link to="/RecipesList">RecipesList</Link>
              </li>
              <li>
                <Link to="/DB">DB</Link>
              </li>
              <li>
                <Link to='/'>{this.props.UserStore.userList?'Logout':'Login'}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default App;