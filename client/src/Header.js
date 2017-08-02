import React from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router

class App extends React.Component {
  render() {
    return (
          <ul className="nav navbar-nav">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/form">form</Link>
            </li>
            <li>
              <Link to="/ingredientsList">ingredientsList</Link>
            </li>
            <li>
              <Link to="/Watson">Watson</Link>
            </li>
            <li>
              <Link to="/food">food</Link>
            </li>
            <li>
              <Link to="/AddItem">AddItem</Link>
            </li>
            <li>
              <Link to="/DB">DB</Link>
            </li>
          </ul>
    );
  }
}

export default App;