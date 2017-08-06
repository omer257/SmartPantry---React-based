import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          recipes: [],recipesCount: 13,ingredients: ''
      }
  }

componentWillMount(){
    let ingredientsList = ''
    this.props.ingredientsStore.filteredingredientsStores.map((item)=>{
      ingredientsList+=item.value + ',';
    });
    this.setState({ ingredients:ingredientsList })
    
    }
  // Fetch passwords after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the passwords and store them in state
    fetch('/api/food/'+this.state.recipesCount+'/'+this.state.ingredients)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes })
      });
  }

  render() {
    const { recipes,ingredients,recipesCount } = this.state;
    return (
      <div className="row">
        {recipes.length ? ( 
          <div>
            {ingredients}
            <h1>{recipesCount} Recipes.</h1>
              {recipes.map((item, index) =>
              <div className="card col-sm-3" key={index}>
          <img className="card-img-top img-responsive" src={item.image} alt={item.title} />
          <div className="card-block">
            <h4 className="card-title">{item.title}</h4>
            {/*<p className="card-text">Description:soon.</p>*/}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">likes:{item.likes}</li>
            <li className="list-group-item">
              <b>Instock:</b>{item.usedIngredientCount}
              {item.usedIngredients.map((item, index) =>
              <div key={index}>{item.amount}{item.unit} - {item.name}</div>
              )}</li>
            <li className="list-group-item">
              <b>{item.missedIngredientCount} items missing</b><br />
              {item.missedIngredients.map((item, index) =>
              <div key={index}>{item.amount}{item.unit} - {item.name}</div>
              )}
            </li>
          </ul>
          {/*<div className="card-block">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>*/}
        </div>  
        
              )}
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>Fetching recipes</h1>
            <img src="foodAjax.gif" alt=""/>
          </div>
        )}
      </div>
    );
  }
}

export default App;