import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';

import {inject, observer} from 'mobx-react';

@inject('ingredientsStore')
@observer
export default class ingredientsList extends React.Component {

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
    toggleInuse(ingredientsStoreItem) {
        this
            .props
            .ingredientsStore
            .upgradeingredientsStore(ingredientsStoreItem);
    }
    filter(e) {
        this.props.ingredientsStore.filter = e.target.value;
    }
    render() {
        const {filter, filteredingredientsStores, clearInuse, IngredientType, IngredientQuantity} = this.props.ingredientsStore;

        const options = IngredientType.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ));
        let ingredientsList = filteredingredientsStores.map((ingredientsStoreItem, index) => {
            return <div className="well" key={index}>
                <b>{ingredientsStoreItem.value}</b>-{IngredientType[ingredientsStoreItem.type].name}
                <small>Valid until:- ({ingredientsStoreItem.date})</small>
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
                    value={ingredientsStoreItem.Inuse}
                    checked={ingredientsStoreItem.Inuse}
                    onChange={this
                    .toggleInuse
                    .bind(this, ingredientsStoreItem)}/>
                <span
                    className="glyphicon glyphicon-trash"
                    onClick={this
                    .deleteingredientsStore
                    .bind(this, ingredientsStoreItem)}></span>
            </div>
        })
        return (
            <div className="row">
                <h1>Ingredient list</h1>
                <br/>
                
                <form className="form-inline">
                    <div className="form-group">
                        <label htmlFor="filter">Search by&nbsp;</label>
                        <input
                            id="filter"
                            className="form-control"
                            type="text"
                            value={filter}
                            onChange={this
                            .filter
                            .bind(this)}/></div>
                    <div className="form-group">
                        <label htmlFor="itemType">Category:&nbsp;</label>
                        <select
                            className="form-control"
                            onChange={(event) => this.setState({itemType: event.target.value})}
                            id="itemType">
                            {options}
                        </select>
                    </div>
                    <div className="form-group" onClick={clearInuse}>Show Unused className=</div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <br/> {ingredientsList}
            </div>
        );
    }
}

ingredientsList.propTypes = {
    //   ingredientsStore: PropTypes.func.isRequired,
};
