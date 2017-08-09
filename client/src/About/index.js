import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

@inject('routing')
@observer
export default class App extends Component {
  render() {
    // const {location, push, goBack} = this.props.routing;

    const rooster = require('./rooster.jpg');
    return (
      <section className="bg-primary text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="section-heading">Smart pantry</h2>
              <p>
                Tired of planning your meals? Want to know what you have at your pantry And do
                it in a cool way?<br />
                With this app you can do the following:<br/>
              </p>
                  <div>Keep track of your pantry</div>
                  <div>Add new items using camera</div>
                  <div>Keep track of your pantry</div>
                  <div>Keep track of your pantry</div>
              <a href="#download" className="btn btn-outline btn-xl page-scroll">Start Now for Free!</a>
            </div>
            <div className="col-md-4">
              <h2 className="section-heading">Our team</h2>
              <img className="circle" src={rooster} alt="rooster"/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}