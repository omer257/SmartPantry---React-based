import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

@inject('routing')
@observer
export default class App extends Component {
  render() {
    const {location, push, goBack} = this.props.routing;

    const rooster = require('./rooster.jpg');
    return (
      <div className="row">
        <div className="col-md-12">
          <h1>About us.. or actually why?</h1>
          <h2>So why we made smart pantry?</h2>
          <p>
           Well... i love to cook and also travel around the world :) <br/>
           But i allways forget what i have at home (My super yummi peanut butter sauce from thailand,<br />
           Or some amazing spice i got as a gift from the states..)<br />
           So.. I decided to create this Smartpantry app to sort all my cooking skills and yours!<br />

           Technologies:<br />
           React,mobx,FireBase,NodeJs,Watson API,food recepie API

          </p>
          <img className="circle" src="https://ak8.picdn.net/shutterstock/videos/7135981/thumb/1.jpg?i10c=img.resize(height:160)" alt=""/>
          <img className="circle" src="http://cdn1.feedyourneedtoread.com/app/uploads/2015/03/In-The-Kitchen-copy-e1425937021371.jpg" alt=""/>
          <h3>The team</h3>
          <img className="img-responsive" src={rooster} alt="rooster"/>
          <span>Current pathname: {location.pathname}</span>
          <button onClick={() => push('/test')}>Change url</button>
          <button onClick={() => goBack()}>Go Back</button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
    routing: PropTypes.shape({
      location: PropTypes.object.isRequired,
      push: PropTypes.object.isRequired,
      goBack: PropTypes.object.isRequired
    })
};