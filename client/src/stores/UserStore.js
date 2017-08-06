import {observable, computed} from "mobx"

class userStoreScheme {
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


class userStore {
  @observable userList = ''

  createUser(result) {
    this.userList = new userStoreScheme(result);
  }

  deleteUser(value) {
      this.userList ='';
  }

}
var store = window.store = new userStore();

export default store;
