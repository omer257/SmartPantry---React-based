import React from 'react';
import PropTypes from 'prop-types';

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
    filterCategory(e) {
        this.props.ingredientsStore.filterCatagory = e.target.value;
    }
    render() {
        const {filter, filteredingredientsStores, clearInuse, IngredientType, filterUse} = this.props.ingredientsStore;

        const options = IngredientType.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ));
        let ingredientsList = filteredingredientsStores.map((ingredientsStoreItem, index) => {
            return <div className="col-sm-3" key={index}>
                <div className="well">
                    <div
                        style={{
                        float: 'left',
                        width: '90%'
                    }}>
                        <b>{ingredientsStoreItem.value}</b>
                    </div>
                    <div
                        style={{
                        float: 'right',
                        width: '10%'
                    }}>
                        <span
                            className="glyphicon glyphicon-trash"
                            onClick={this
                            .deleteingredientsStore
                            .bind(this, ingredientsStoreItem)}></span>
                    </div>
                    <small>Amount :{ingredientsStoreItem.quantity}</small><br/>
                    <small>Category:{IngredientType[ingredientsStoreItem.type].name}</small><br/>
                    <small>Valid until: ({ingredientsStoreItem.date})</small><br/>
                    <small>Use item:
                        <input
                            type="checkbox"
                            value={ingredientsStoreItem.Inuse}
                            checked={ingredientsStoreItem.Inuse}
                            onChange={this
                            .toggleInuse
                            .bind(this, ingredientsStoreItem)}/></small><br/>

                </div>
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
                            onChange={this
                            .filterCategory
                            .bind(this)}
                            id="itemType">
                            {options}
                        </select>
                    </div>
                    <div className="form-group" onClick={clearInuse}> {filterUse}</div>
                </form>
                <br/> {ingredientsList}
            </div>
        );
    }
}

ingredientsList.propTypes = {
    //   ingredientsStore: PropTypes.func.isRequired,
};
