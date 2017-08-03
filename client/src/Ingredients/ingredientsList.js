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
    deleteingredientsStore(ingredientsStoreItem) {
        this
            .props
            .ingredientsStore
            .deleteingredientsStore(ingredientsStoreItem);
    }
    updateingredientsStore(ingredientsStoreItem, value) {
        this
            .props
            .ingredientsStore
            .upgradeingredientsStore(ingredientsStoreItem);
    }
    toggleComplete(ingredientsStoreItem) {
        this
            .props
            .ingredientsStore
            .upgradeingredientsStore(ingredientsStoreItem);
    }
    filter(e) {
        this.props.ingredientsStore.filter = e.target.value;
    }
    render() {
        const options = this
            .props
            .ingredientsStore
            .IngredientType
            .map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ));

        const {filter, filteredingredientsStores, clearCompleted} = this.props.ingredientsStore;
        let ingredientsList = filteredingredientsStores.map((ingredientsStoreItem, index) => {
            return <li key={index}>
                {ingredientsStoreItem.quantity}
                - {ingredientsStoreItem.value}
                <small>- ({ingredientsStoreItem.type}) - ({ingredientsStoreItem.date})</small>
                <input
                    type="number"
                    className="form-control"
                    id="itemQuantity"
                    required
                    value={ingredientsStoreItem.quantity}
                    onChange={this
                    .updateingredientsStore
                    .bind(this, ingredientsStoreItem, 2)}/>

                <input
                    type="checkbox"
                    value={ingredientsStoreItem.complete}
                    checked={ingredientsStoreItem.complete}
                    onChange={this
                    .toggleComplete
                    .bind(this, ingredientsStoreItem)}/>
                <span
                    onClick={this
                    .deleteingredientsStore
                    .bind(this, ingredientsStoreItem)}>X
                </span>
            </li>
        })
        return (
            <div>
                <h1>ingredientsStore</h1>
                <div>{filter}</div>
                <form
                    action="#"
                    id="getWeatherForm"
                    onSubmit={this
                    .createingredientsStore
                    .bind(this)}>
                    <div className="input-group">
                        <AutoComplete onChange={(value) => this.setState({itemName: value})} />
                        
                        <input
                            type="text"
                            className="text-box"
                            id="itemDate"
                            placeholder="Enter itemDate"
                            required
                            value={this.state.itemDate}
                            onChange={(event) => this.setState({itemDate: event.target.value})}/>
                        <input
                            type="number"
                            className="text-box"
                            id="itemQuantity"
                            placeholder="Enter itemQuantity"
                            required
                            value={this.state.itemQuantity}
                            onChange={(event) => this.setState({itemQuantity: event.target.value})}/>
                        <select
                            onChange={(event) => this.setState({itemType: event.target.value})}
                            id="itemType">
                            {options}
                        </select>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="submit">Go!</button>
                        </span>
                    </div>
                </form>
                {/*<label htmlFor="create">Add<input id="create" className="create" type="text" onKeyPress={this.createingredientsStore.bind(this)}/></label>*/}
                <label htmlFor="filter">Search<input
                    id="filter"
                    className="filter"
                    type="text"
                    value={filter}
                    onChange={this
                .filter
                .bind(this)}/></label>
                <ul>{ingredientsList}</ul>
                <div onClick={clearCompleted}>Show completed</div>
            </div>
        );
    }
}

ingredientsList.propTypes = {
    //   ingredientsStore: PropTypes.func.isRequired,
};
