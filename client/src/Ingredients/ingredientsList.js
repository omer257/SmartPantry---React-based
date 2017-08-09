import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {Link} from 'react-router-dom'; //Calling link to bind with router

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

    getSelection(filterType, str) {
        let item = this
            .props
            .ingredientsStore[filterType]
            .filter((obj) => {
                return obj.id == str
            });
        if (item[0] !== null) {
            return item[0].name;

        }
    }
    render() {
        const {
            filter,
            filteredingredientsStores,
            clearInuse,
            IngredientType,
            filterUseText,
            validityType
        } = this.props.ingredientsStore;

        const options = IngredientType.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
        ));
        let ingredientsList = filteredingredientsStores.map((ingredientsStoreItem, index) => {
            return <div className="col-sm-3 col-xs-6" key={index}>
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
                            .bind(this, ingredientsStoreItem.id)}></span>
                    </div>

                    <small>Amount :{ingredientsStoreItem.quantity}</small><br/>
                    <small>Category:{this.getSelection('IngredientType', ingredientsStoreItem.type)}</small><br/>
                    <small>Valid until: ({this.getSelection('validityType', ingredientsStoreItem.date)})</small><br/>
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
            <section className="bg-primary text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <h2 className="section-heading">Ingredient list</h2>
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
                                    <label htmlFor="itemType">&nbsp;&nbsp;Category:&nbsp;</label>
                                    <select
                                        className="form-control"
                                        onChange={this
                                        .filterCategory
                                        .bind(this)}
                                        id="itemType">
                                        {options}
                                    </select>
                                </div>
                                <div className="form-group" onClick={clearInuse}>&nbsp;{filterUseText}</div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12"><br/><br/>
                        {ingredientsList.length?
                        (<ReactCSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                                {ingredientsList}
                            </ReactCSSTransitionGroup>)
                        :
                        (<div>Your list is empty, <Link to="/AddIngredient">Click here to add more</Link></div>)}
                            
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

ingredientsList.propTypes = {
    ingredientsStore: PropTypes.shape({filter: PropTypes.object.isRequired, filteredingredientsStores: PropTypes.object.isRequired, clearInuse: PropTypes.object.isRequired, IngredientType: PropTypes.object.isRequired, filterUseText: PropTypes.object.isRequired})
};
