import React, {Component} from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router

export default class _404 extends Component {

  render() {
    return (
      <div className="text-center">
        <img
          src="http://www.404notfound.fr/assets/images/pages/img/androiddev101.jpg"
          className="img-responsive"
          alt="sorry"/><br/>
        <Link to='/'>
          <h1>Go home... Shoo!</h1>
        </Link>
      </div>
    );
  }
}
