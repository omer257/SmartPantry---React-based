import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';

import {inject, observer} from 'mobx-react';

@inject('ingredientsStore')
@observer
export default class ingredientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemQuantity: '',
            itemType: '',
            itemDate: ''
        }
    }
    createingredientsStore(e) {
        e.preventDefault();
        let state = this.state;
        this
            .props
            .ingredientsStore
            .createingredientsStore(state.itemName, state.itemQuantity, state.itemType, state.itemDate);
    }
    render() {

        const {filter, filteredingredientsStores, clearInuse, IngredientType,IngredientQuantity} = this.props.ingredientsStore;

        const options = IngredientType
            .map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ));

        const quantity = IngredientQuantity.map((item) => (
            <option key={item} value={item}>{item}</option>
        ));

        return (
            <div>
                <h1>Add ingredient</h1>
                <form
                    action="#"
                    id="getWeatherForm"
                    onSubmit={this
                    .createingredientsStore
                    .bind(this)}>
                    <div className="form-group">
                        <label htmlFor="email">Ingredient name:</label>
                        <AutoComplete onChange={(value) => this.setState({itemName: value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemDate">Ingredient validity:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="itemDate"
                            placeholder="Enter itemDate"
                            required
                            value={this.state.itemDate}
                            onChange={(event) => this.setState({itemDate: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemQuantity">Ingredient quantity:</label>
                        <select
                            className="form-control"
                            onChange={(event) => this.setState({itemQuantity: event.target.value})}
                            id="itemQuantity">
                            {quantity}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemType">Ingredient type:</label>
                        <select
                            className="form-control"
                            onChange={(event) => this.setState({itemType: event.target.value})}
                            id="itemType">
                            {options}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form> 
            </div>
        );
    }
}

ingredientsList.propTypes = {
    //   ingredientsStore: PropTypes.func.isRequired,
};
