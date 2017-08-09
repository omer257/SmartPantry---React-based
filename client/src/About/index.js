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
                With this app you can do the following:<br/><br/>

                <ul>
                  <li>Keep track of your pantry</li>
                  <li>Add new items using Image detection API</li>
                  <li>Get custom recepis based on your needs</li>
                  <li>Sync actions between accounts on all devices</li>
                  </ul>
              </p>
              <a href="#download" className="btn btn-outline btn-xl page-scroll">Start Now for Free!</a>
            </div>
            <div className="col-md-4">
              <h2 className="section-heading">Our team</h2>
              <img className="circle" src={rooster} alt="rooster"/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12"><br/><br/><br/>
              <p>
                <b>Technologies used in this project:</b><br/>
                React js, Firebase, Mobx architecure, Node js/express
              </p>
            </div>
          </div>

        </div>
      </section>
    );
  }
}