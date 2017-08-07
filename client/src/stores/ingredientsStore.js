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

let IngredientType = [
  {
    id: '',
    name: 'All'
  }, {
    id: 1,
    name: 'Fresh fruit/vegetable'
  }, {
    id: 2,
    name: 'Canned food'
  }, {
    id: 3,
    name: 'Pultry/beef/fish'
  }, {
    id: 4,
    name: 'Frozen fruit/vegetable'
  }, {
    id: 5,
    name: 'Sauces'
  }, {
    id: 6,
    name: 'Dry food'
  }, {
    id: 7,
    name: 'Dairy'
  }, {
    id: 8,
    name: 'Sauce'
  }
];

let validityType = [
  {
    id: 1,
    name: '1 day'
  }, {
    id: 3,
    name: '3 day'
  }, {
    id: 5,
    name: '5 day'
  }, {
    id: 7,
    name: '1 week'
  }, {
    id: 14,
    name: '2 weeks'
  }
];

let IngredientQuantity = [
  1,
  2,
  3,
  4,
  5,
  6,
  7
];

class ingredientsStore {
  @observable IngredientQuantity = IngredientQuantity
  @observable IngredientType = IngredientType
  @observable validityType = validityType
  @observable ingredientsStores = []
  @observable filter = ""
  @observable filterCatagory = ""
  @observable filterUse = "Show in use"
  @computed get filteredingredientsStores() {
    var matchFilter = new RegExp(this.filter, "i")
    var matchfilterCatagory = new RegExp(this.filterCatagory, "i")
    return this
      .ingredientsStores
      .filter(ingredientsStore => !this.filter || matchFilter.test(ingredientsStore.value))
      .filter(ingredientsStore => !this.filterCatagory || matchfilterCatagory.test(ingredientsStore.type))
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
var store = new ingredientsStore();

export default store;
