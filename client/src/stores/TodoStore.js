import { autorun, observable,computed } from "mobx"

class Todo {
  @observable value;
  @observable id;
  @observable complete;

  constructor(value){
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

class TodoStore {
  @observable todos = []
  @observable filter = ""
  @computed get filteredToDos(){
    var matchFilter = new RegExp(this.filter,"i")
    return this.todos.filter(todo=> !this.filter || matchFilter.test(todo.value))
  }

  createTodo(value){
    this.todos.push(new Todo(value));
  }

  deleteTodo(value){
    if(this.todos.indexOf(value)>-1){
      this.todos.splice(this.todos.indexOf(value),1);
    }
  }

  toggleComplete(value){
    if(this.todos.indexOf(value)>-1){
      let isComplete = this.todos[this.todos.indexOf(value)].complete;
      this.todos[this.todos.indexOf(value)].complete = !isComplete;
    }
  }
  clearCompleted = ()=>{
    const inCompletedTodos = this.todos.filter(todo=> !todo.complete)
    this.todos.replace(inCompletedTodos);
  }
}
var store = window.store = new TodoStore();

export default store;

autorun(()=>{
    // console.log(store.filter)
    // console.log(store.todos[0])
})