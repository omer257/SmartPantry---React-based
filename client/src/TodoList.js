import React from 'react';
import PropTypes from 'prop-types';

import { inject, observer } from 'mobx-react';

@inject('todostore')
@observer
export default class TodoList extends React.Component {
    
    createTodo(e){
       if(e.which === 13){
           this.props.todostore.createTodo(e.target.value);
           e.target.value = "";
       }
    }
    deleteTodo(todoItem){
        this.props.todostore.deleteTodo(todoItem);
    }
    toggleComplete(todoItem){
        this.props.todostore.toggleComplete(todoItem);
    }
    filter(e){
        this.props.todostore.filter=e.target.value;
    }
    render() { 
        const { filter,filteredToDos,clearCompleted } = this.props.todostore;
        let TodoList= filteredToDos.map((todoItem,index)=>{
           return <li key={index}>
               {todoItem.value}
               <input type="checkbox" 
               value={todoItem.complete} 
               checked={todoItem.complete}
               onChange={this.toggleComplete.bind(this,todoItem)}/>
           <span onClick={this.deleteTodo.bind(this,todoItem)}>X
               </span></li>
        })
        return (
            <div>
                <h1>Todo</h1>
                <div>{filter}</div>
                <label htmlFor="create">Add<input id="create" className="create" type="text" onKeyPress={this.createTodo.bind(this)}/></label>
                <label htmlFor="filter">Search<input id="filter" className="filter" type="text" value={filter} onChange={this.filter.bind(this)}/></label><ul>{TodoList}</ul>
                <div onClick={clearCompleted}>Show completed</div>
            </div>
        );
    }
}

TodoList.propTypes = {
//   todostore: PropTypes.func.isRequired,
};
