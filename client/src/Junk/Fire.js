import React, {Component} from 'react';
import MobxFirebaseStore, { ObservableSubscriptionGraph } from 'mobx-firebase-store';
import {observer} from 'mobx-react';
import {createAutoSubscriber} from 'firebase-nest';
import firebase from 'firebase'; 
import RegisterOrLogin from './RegisterOrLogin';
import stores from './stores';
import {fbRef,fbApp} from './FirebaseConfig'; 
const store = new MobxFirebaseStore(fbRef); 
/* Real-time messages */

class MessageList extends Component {
  
  render() {
    return (

      <div className="row">
       <RegisterOrLogin />
      </div> 
    );
  }
}
export default MessageList;