import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

@inject('ingredientsStore')
@observer
export default class ingredientsList extends React.Component {
    
    createingredientsStore(e){
       if(e.which === 13){
           this.props.ingredientsStore.createingredientsStore(e.target.value);
           e.target.value = "";
       }
    }
    deleteingredientsStore(ingredientsStoreItem){
        this.props.ingredientsStore.deleteingredientsStore(ingredientsStoreItem);
    }
    toggleComplete(ingredientsStoreItem){
        this.props.ingredientsStore.toggleComplete(ingredientsStoreItem);
    }
    filter(e){
        this.props.ingredientsStore.filter=e.target.value;
    }
    render() { 
        const { filter,filteredingredientsStores,clearCompleted } = this.props.ingredientsStore;
        let ingredientsList= filteredingredientsStores.map((ingredientsStoreItem,index)=>{
           return <li key={index}>
               {ingredientsStoreItem.value}
               <input type="checkbox" 
               value={ingredientsStoreItem.complete} 
               checked={ingredientsStoreItem.complete}
               onChange={this.toggleComplete.bind(this,ingredientsStoreItem)}/>
           <span onClick={this.deleteingredientsStore.bind(this,ingredientsStoreItem)}>X
               </span></li>
        })
        return (
            <div>
                <h1>ingredientsStore</h1>
                <div>{filter}</div>
                <label htmlFor="create">Add<input id="create" className="create" type="text" onKeyPress={this.createingredientsStore.bind(this)}/></label>
                <label htmlFor="filter">Search<input id="filter" className="filter" type="text" value={filter} onChange={this.filter.bind(this)}/></label><ul>{ingredientsList}</ul>
                <div onClick={clearCompleted}>Show completed</div>
            </div>
        );
    }
}

ingredientsList.propTypes = {
//   ingredientsStore: PropTypes.func.isRequired,
};
