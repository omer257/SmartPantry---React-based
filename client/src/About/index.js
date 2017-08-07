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
          <h1>About us</h1>
          <h2>Lorem Ipsum is simply dummy text
          </h2>
          <p>
            of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>

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