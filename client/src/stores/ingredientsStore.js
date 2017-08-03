import {observable, computed} from "mobx"

class ingredientsStoreItem {
  @observable value;
  @observable id;
  @observable date;
  @observable type;
  @observable quantity;
  @observable complete;

  constructor(itemName, itemQuantity, itemType, itemDate) {
    this.value = itemName;
    this.date = itemDate;
    this.quantity = itemQuantity || 1;
    this.type = itemType || 1;
    this.id = Date.now();
    this.complete = false;
  }
}

let IngredientType= [
  {
    id: 1,
    name: 'Vegatable'
  }, {
    id: 2,
    name: 'Dairy'
  }, {
    id: 3,
    name: 'Canned goods'
  }, {
    id: 4,
    name: 'Pultry'
  }
];

class ingredientsStore {
  @observable IngredientType = IngredientType
  @observable ingredientsStores = []
  @observable filter = ""
  @computed get filteredingredientsStores() {
    var matchFilter = new RegExp(this.filter, "i")
    return this
      .ingredientsStores
      .filter(ingredientsStore => !this.filter || matchFilter.test(ingredientsStore.value))
  }

  createingredientsStore(itemName, itemQuantity, itemType, itemDate) {
    this
      .ingredientsStores
      .push(new ingredientsStoreItem(itemName, itemQuantity, itemDate));
  }

  deleteingredientsStore(value) {
    if (this.ingredientsStores.indexOf(value) > -1) {
      this
        .ingredientsStores
        .splice(this.ingredientsStores.indexOf(value), 1);
    }
  }

  upgradeingredientsStore(value, value2) {
    if (this.ingredientsStores.indexOf(value) > -1) {
      let isComplete = this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].complete;
      this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].complete = !isComplete;
    }
  }

  toggleComplete(value) {
    if (this.ingredientsStores.indexOf(value) > -1) {
      let isComplete = this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].complete;
      this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].complete = !isComplete;
    }
  }

  clearCompleted = () => {
    const inCompletedingredientsStores = this
      .ingredientsStores
      .filter(ingredientsStore => !ingredientsStore.complete)
    this
      .ingredientsStores
      .replace(inCompletedingredientsStores);
  }
}
var store = window.store = new ingredientsStore();

export default store;
