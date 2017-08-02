import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
export default class App extends Component {
  render() {
    const { location, push, goBack } = this.props.routing;

    const rooster = require('./rooster.jpg');
    return (
      <div>
        <img src={rooster} alt="rooster"/>
        <span>Current pathname: {location.pathname}</span>
        <button onClick={() => push('/test')}>Change url</button>
        <button onClick={() => goBack()}>Go Back</button>
      </div>
    );
  }
}