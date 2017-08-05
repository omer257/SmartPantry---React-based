import {observable, computed} from "mobx"

class ingredientsStoreItem {
  @observable value;
  @observable id;
  @observable date;
  @observable type;
  @observable quantity;
  @observable Inuse;

  constructor(itemName, itemQuantity, itemType, itemDate) {
    this.value = itemName;
    this.date = itemDate;
    this.quantity = itemQuantity || 1;
    this.type = itemType || 1;
    this.id = Date.now();
    this.Inuse = true;
  }
}

let IngredientType= [
  {
    id: 0,
    name: 'All'
  }, {
    id: 1,
    name: 'Dairy'
  }, {
    id: 2,
    name: 'Canned goods'
  }, {
    id: 3,
    name: 'Pultry'
  }, {
    id: 4,
    name: 'Vegatable'
  }
];

let IngredientQuantity= [1,2,3,4,5,6,7];

class ingredientsStore {
  @observable IngredientQuantity = IngredientQuantity
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
      .push(new ingredientsStoreItem(itemName, itemQuantity, itemType, itemDate));
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
      let isInuse = this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].Inuse;
      this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].Inuse = !isInuse;
    }
  }

  toggleInuse(value) {
    if (this.ingredientsStores.indexOf(value) > -1) {
      let isInuse = this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].Inuse;
      this.ingredientsStores[
        this
          .ingredientsStores
          .indexOf(value)
      ].Inuse = !isInuse;
    }
  }

  clearInuse = () => {
    const inInuseingredientsStores = this
      .ingredientsStores
      .filter(ingredientsStore => !ingredientsStore.Inuse)
    this
      .ingredientsStores
      .replace(inInuseingredientsStores);
  }
}
var store = window.store = new ingredientsStore();

export default store;
