import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import RecipesBox from './RecipesBox'

@inject('ingredientsStore')
@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipesCount: 30,
      ingredients: '',
      fetching: false
    }
  }

  componentWillMount() {
    let ingredientsList = ''
    this
      .props
      .ingredientsStore
      .filteredingredientsStores
      .map((item) => {
        return ingredientsList += item.value + ',';
      });
    this.setState({ingredients: ingredientsList})

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({fetching: true})
    fetch('/api/food/' + this.state.recipesCount + '/' + this.state.ingredients)
      .then(res => res.json())
      .then(recipes => {
        this.setState({recipes, fetching: false})
      });
  }

  render() {
    const {recipes, recipesCount, fetching} = this.state;
    return (
      <section id="" className=" bg-primary text-center">
        <div className="container">
          <div className="row is-flex">
            <div className="col-md-12">
              {fetching
                ? (
                  <div style={{
                    overflow: 'hidden'
                  }}>
                    <h1 className="h1Animted">Fetching recepies!</h1>
                    <div id="cooking">
                      <div className="bubble"></div>
                      <div className="bubble"></div>
                      <div className="bubble"></div>
                      <div className="bubble"></div>
                      <div className="bubble"></div>
                      <div id="area">
                        <div id="sides">
                          <div id="pan"></div>
                          <div id="handle"></div>
                        </div>
                        <div id="pancake">
                          <div id="pastry"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                : (
                  <div className="row is-flex">
                    <h1>Found {recipesCount} Recipes - for <Link to="/ingredientsList">saved ingredients</Link></h1>
                    
                    {recipes.length
                      ? (
                          <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            {recipes.map((item, index) => <RecipesBox key={index} item={item}/>)}
                          </ReactCSSTransitionGroup>
                      )
                      : (
                        <h1>Fetching recipes</h1>
                      )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;

App.propTypes = {
  ingredientsStore: PropTypes.shape({filteredingredientsStores: PropTypes.object.isRequired, recipes: PropTypes.object.isRequired, ingredients: PropTypes.object.isRequired, recipesCount: PropTypes.object.isRequired})
};