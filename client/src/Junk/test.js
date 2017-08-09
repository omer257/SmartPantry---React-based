import React, { Component } from 'react';
import firebase from 'firebase'
import {fbApp} from './FirebaseConfig';
import {inject, observer} from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {
  constructor() {
    super();
    this.state = {
      quantity: '',
      type: '',
      inuse: '',
      date: '',
      value: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {  
     this
            .props
            .ingredientsStore
            .getData();
    // const itemsRef = fbApp.database().ref('users/sM5IRITjXGOW2eR9HokN7Y8V8ZC3/ingredients');
    // itemsRef.on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newState = [];
    //   for (let item in items) {
    //     newState.push({
    //       id: item,
    //       type: items[item].type,
    //       inuse: items[item].inuse,
    //       date: items[item].date,
    //       quantity: items[item].quantity,
    //       value: items[item].value
    //     });
    //   }
    //   this.setState({
    //     items: newState,
    //     currentUser:firebase.auth().currentUser.uid
    //   });
    // });
  }
  render() {
    const {filter, filteredingredientsStores, clearInuse, IngredientType, filterUseText} = this.props.ingredientsStore;

    return (
      <div className='app'>
      </div>
    );
  }
}
export default App;