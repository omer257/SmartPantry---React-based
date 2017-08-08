import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

@inject('ingredientsStore')
@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipesCount: 13,
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
      <div>
        {fetching
          ? (
            <div style={{overflow: 'hidden'}}>
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
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h1>{recipesCount}
                    Recipes.</h1>
                  <Link to="/ingredientsList">My ingredients</Link>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  {recipes.length
                    ? (
                      <div>
<ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          
               {recipes.map((item, index) => <div className="card col-sm-3" key={index}>
                          <img className="card-img-top img-responsive" src={item.image} alt={item.title}/>
                          <div className="card-block">
                            <h4 className="card-title">{item.title}</h4>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">likes:{item.likes}</li>
                            <li className="list-group-item">
                              <b>Instock:</b>{item.usedIngredientCount} {item
                                .usedIngredients
                                .map((item, index) => <div key={index}>
                                  {parseFloat(Math.round(item.amount * 100) / 100).toFixed(2)}&nbsp;{item.unit}
                                  - {item.name}</div>)}</li>
                            <li className="list-group-item">
                              <b>{item.missedIngredientCount}
                                items missing</b><br/> {item
                                .missedIngredients
                                .map((item, index) => <div key={index}>
                                  {parseFloat(Math.round(item.amount * 100) / 100).toFixed(2)}
                                  &nbsp;{item.unit}
                                  - {item.name}</div>)}
                            </li>
                          </ul>
                          {/*<div className="card-block">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
              </div>*/}
                        </div>)}
        </ReactCSSTransitionGroup>
                        
                      </div>
                    )
                    : (
                      <h1>Fetching recipes</h1>
                    )}
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  ingredientsStore: PropTypes.shape({filteredingredientsStores: PropTypes.object.isRequired, recipes: PropTypes.object.isRequired, ingredients: PropTypes.object.isRequired, recipesCount: PropTypes.object.isRequired})
};