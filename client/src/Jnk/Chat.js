// import React from 'react';
// import PropTypes from 'prop-types';

// import {createAutoSubscriber} from 'firebase-nest';
// import { inject, observer } from 'mobx-react';

// @inject('mobxStore')
// @observer
// /* Real-time messages */
// class MessageList extends React.Component {
//     renderMessage(messageKey, messageData) {
//         return (
//           <div style={{border:'1px grey solid'}} key={messageKey}>
//               <div>{messageData.text}</div>
//               <div>Posted {new Date(messageData.timestamp).toString()}</div>
//           </div>
//         );
//     }
//     render() {
//         const messages = this.props.mobxStore.getData('myMsgs'); //'myMsgs' matches the subKey below
        
//         //autoSubscriber keeps track of loading and error status when using store.subscribeSubsWithPromise
//         const { _autoSubscriberFetching: fetching, _autoSubscriberError: fetchError, error } = this.state
        
//         //store.getData returns mobx observable map - use keys(), get(), entries(), etc. to render the data
//         //do NOT use set() or other mutations on the map -- updates should be written directly to firebase, and will get reflected in the observable map automatically.
        
//         if (!messages) {
//             return <div>Loading messages...</div>
//         }
//         return (
//           <div>
//               Messages:
//               {messages.keys().map(messageKey => this.renderMessage(messageKey, messages.get(messageKey)))}
//           </div>
//         );
//     }
// }

// //Subscribe to and observe firebase data
// export default createAutoSubscriber({
//     getSubs: (props, state) => [{
//         subKey: 'myMsgs', //any unique string describing this subscription; must match getData call
//         asList: true, //or asValue: true. asList will internally subscribe via firebase child_added/removed/changed; asValue via onValue.
//         path: 'samplechat/messages', //firebase location,
        
//         //Optional - get data callbacks after store data is already updated:
//         onData: (type, snapshot) => console.log('got data: ', type, 'myMsgs', snapshot.val())
        
//     }], //can add more than one subscription to this array
    
//     subscribeSubs: (subs, props, state) => this.props.mobxStore.subscribeSubsWithPromise(subs)
// })(observer(MessageList));
