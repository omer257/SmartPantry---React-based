import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {


    componentWillMount(){
        this.props.ingredientsStore.createingredientsStore('Garlic',1,1,1);
        this.props.ingredientsStore.createingredientsStore('lemon',1,1,1);
        this.props.ingredientsStore.createingredientsStore('Tomato',1,1,1);
        this.props.ingredientsStore.createingredientsStore('Cucumber',1,1,1);
        this.props.ingredientsStore.createingredientsStore('Onion',1,1,1);
        this.props.ingredientsStore.createingredientsStore('Tuna',1,2,1);
        this.props.ingredientsStore.createingredientsStore('Corn',1,2,1);
        this.props.ingredientsStore.createingredientsStore('Tomato sauce',1,2,1);
        this.props.ingredientsStore.createingredientsStore('Tomato paste',1,2,1);
    }

  render() {
    return (
      <div className="App">
        Fake db initiated
      </div>
    );
  }
}

export default App;