import {observable,computed } from "mobx"

class ingredientsStoreItem {
  @observable value;
  @observable id;
  @observable complete;

  constructor(value){
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

class ingredientsStore {
  @observable ingredientsStores = []
  @observable filter = ""
  @computed get filteredingredientsStores(){
    var matchFilter = new RegExp(this.filter,"i")
    return this.ingredientsStores.filter(ingredientsStore=> !this.filter || matchFilter.test(ingredientsStore.value))
  }

  createingredientsStore(value){
    this.ingredientsStores.push(new ingredientsStoreItem(value));
  }

  deleteingredientsStore(value){
    if(this.ingredientsStores.indexOf(value)>-1){
      this.ingredientsStores.splice(this.ingredientsStores.indexOf(value),1);
    }
  }

  toggleComplete(value){
    if(this.ingredientsStores.indexOf(value)>-1){
      let isComplete = this.ingredientsStores[this.ingredientsStores.indexOf(value)].complete;
      this.ingredientsStores[this.ingredientsStores.indexOf(value)].complete = !isComplete;
    }
  }
  clearCompleted = ()=>{
    const inCompletedingredientsStores = this.ingredientsStores.filter(ingredientsStore=> !ingredientsStore.complete)
    this.ingredientsStores.replace(inCompletedingredientsStores);
  }
}
var store = window.store = new ingredientsStore();

export default store;
