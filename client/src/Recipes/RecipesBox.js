import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

@inject('ingredientsStore')
@observer
class App extends Component {
  render() {
    const {item, index} = this.props;
    return (
      <div className="card col-sm-3 " key={index}>
        <div className="customwell">
          <img className="card-img-top img-responsive" src={item.image} alt={item.title}/>
          <div className="card-block">
            <h4 className="card-title">{item.title}</h4>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">likes: {item.likes}</li>
            <li className="list-group-item">
              <b>Instock:</b> {item.usedIngredientCount} {item
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
        </div>
      </div>
    );
  }
}

export default App;