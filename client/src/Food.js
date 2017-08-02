import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
class App extends Component {
  // Initialize state
  state = { recipes: [],recipesCount: 12,ingredients: '' }

  

componentWillMount(){
    let ingredientsList = ''
    this.props.ingredientsStore.filteredingredientsStores.map((item)=>{
      ingredientsList+=item.value + ',';
    });
    this.setState({ ingredients:ingredientsList })
    
    }
  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/food/'+this.state.recipesCount+'/'+this.state.ingredients)
      .then(res => res.json())
      .then(recipes => {
        this.setState({ recipes })
        console.log(recipes);
      });
  }

  render() {
    const { recipes,ingredients,recipesCount } = this.state;
    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {recipes.length ? (
          <div>
            <h1>{recipesCount} Recipes.</h1>
            {ingredients}
            <ul className="passwords">
              {recipes.map((item, index) =>
                <li key={index}>
                  <h2>{item.title}</h2><br />
                  <img src={item.image} alt="{item.title}" style={{width:100}}/><br />
                  likes:{item.likes}<br />
                  <b>usedIngredientCount</b>:{item.usedIngredientCount}
                    {item.usedIngredients.map((item, index) =>
                      <div key={index}>{item.amount}{item.unit} - {item.name}</div>
                    )}
                  <b>missedIngredientCount</b>:{item.missedIngredientCount}<br />
                    {item.missedIngredients.map((item, index) =>
                      <div key={index}>{item.amount}{item.unit} - {item.name}</div>
                    )}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>Fetching recipes</h1>
            <img src="https://s-media-cache-ak0.pinimg.com/originals/dc/66/53/dc6653448a617b0564541708101d3eac.gif" alt=""/>
          </div>
        )}
      </div>
    );
  }
}

export default App;