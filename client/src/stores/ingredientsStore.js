import {observable, computed} from "mobx"
import firebase from 'firebase'
import {fbApp} from '../FirebaseConfig';

class ingredientsStoreItem {
  @observable value;
  @observable id;
  @observable date;
  @observable type;
  @observable quantity;
  @observable Inuse;

  constructor(itemName, itemQuantity, itemType, itemDate, itemId) {
    this.value = itemName;
    this.date = itemDate;
    this.quantity = itemQuantity || 1;
    this.type = itemType || 1;
    this.id = itemId;
    this.Inuse = true;
  }
}

let IngredientType = [
  {
    id: '',
    name: 'Please select'
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
    id: '',
    name: 'Please select'
  },
  {
    id: 1,
    name: '1 day'
  },
   {
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
  'Please select',
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
  @observable ingredientsList = []
  @observable ingredientsFilteredList = []
  @observable filter = ""
  @observable filterCatagory = ""
  @observable filterUseText = "Show Unactive"
  @computed get filteredingredientsStores() {
    var matchFilter = new RegExp(this.filter, "i")
    var matchfilterCatagory = new RegExp(this.filterCatagory, "i")
    return this
      .ingredientsList
      .filter(ingredientsStore => !this.filter || matchFilter.test(ingredientsStore.value))
      .filter(ingredientsStore => !this.filterCatagory || matchfilterCatagory.test(ingredientsStore.type))
  }

  getData() {
    const itemsRef = fbApp
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/ingredients');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      this.ingredientsList =[];
      for (let item in items) {
        this
          .ingredientsList
          .push(new ingredientsStoreItem(items[item].value, items[item].quantity, items[item].type, items[item].date, item));
      }
    });
  }
  createingredientsStore(itemName, itemQuantity, itemType, itemDate) {
    const itemsRef = fbApp
      .database()
      .ref('users/' + firebase.auth().currentUser.uid + '/ingredients');
    const item = {
      quantity: itemQuantity,
      type: itemType,
      inuse: true,
      date: itemDate,
      value: itemName
    }
    itemsRef.push(item);
    //  this.ingredientsList.push(new ingredientsStoreItem(itemName, itemQuantity,
    // itemType, itemDate));
  }

  deleteingredientsStore(value) {
    const itemRef = fbApp
      .database()
      .ref(`/users/${firebase.auth().currentUser.uid}/ingredients/${value}`);
    itemRef.remove();
    this.getData();
    // if (this.ingredientsList.indexOf(value) > -1) {   this     .ingredientsList
    //   .splice(this.ingredientsList.indexOf(value), 1); }
  }

  upgradeingredientsStore(value, value2) {
    if (this.ingredientsList.indexOf(value) > -1) {
      let isInuse = this.ingredientsList[
        this
          .ingredientsList
          .indexOf(value)
      ].Inuse;
      this.ingredientsList[
        this
          .ingredientsList
          .indexOf(value)
      ].Inuse = !isInuse;
    }
  }

  toggleInuse(value) {
    if (this.ingredientsList.indexOf(value) > -1) {
      let isInuse = this.ingredientsList[
        this
          .ingredientsList
          .indexOf(value)
      ].Inuse;
      this.ingredientsList[
        this
          .ingredientsList
          .indexOf(value)
      ].Inuse = !isInuse;
    }
  }

  clearInuse = () => {
    const inUseIngredientsList = this
      .ingredientsList
      .filter(ingredientsStore => !ingredientsStore.Inuse)
    this
      .ingredientsList
      .replace(inUseIngredientsList);
  }
}
var store = new ingredientsStore();

export default store;
