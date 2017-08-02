import React, { Component } from 'react';
import './App.css';
class App extends Component {
  // Initialize state
  state = { recipes: [],recipesCount: 12,ingredients: 'garlic,scallion,artichokes,canned tuna,soya sauce,tomatos,corn,potatos,chicken breast,chicken liver,teriyaki,ginger,lemon,rice wine vinegar' }

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
            {ingredients.split(",")}
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
          </div>
        )}
      </div>
    );
  }
}

export default App;