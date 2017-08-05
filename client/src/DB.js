import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {


    componentWillMount(){
        this.props.ingredientsStore.createingredientsStore('coconut milk',2,3,'1 weeks');
        this.props.ingredientsStore.createingredientsStore('garlic',2,2,'2 weeks');
        this.props.ingredientsStore.createingredientsStore('soya sauce',2,3,'3 weeks');
        this.props.ingredientsStore.createingredientsStore('potatos',2,1,'11 weeks');
        this.props.ingredientsStore.createingredientsStore('skinless boneless chicken breast',2,2,'2 weeks');
        this.props.ingredientsStore.createingredientsStore('lemon',2,3,'21 weeks');
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