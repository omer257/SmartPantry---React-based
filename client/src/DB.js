import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {


    componentWillMount(){
        this.props.ingredientsStore.createingredientsStore('coconut milk');
        this.props.ingredientsStore.createingredientsStore('garlic');
        this.props.ingredientsStore.createingredientsStore('soya sauce');
        this.props.ingredientsStore.createingredientsStore('potatos');
        this.props.ingredientsStore.createingredientsStore('skinless boneless chicken breast');
        this.props.ingredientsStore.createingredientsStore('lemon');
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