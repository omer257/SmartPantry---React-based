
import {observable, action, computed  } from "mobx"
import _ from 'underscore';
import fetch from 'isomorphic-fetch';


// Main Store for credit card form
// This store is passed as a prop to <App />
const store = new class Store {
  @observable matches = [];
  @observable searchString = '';
  @observable selectedItem = {};
  @observable fetched = false;
 
  @computed get isItemSelected() {
    return !_.isEmpty(this.selectedItem);
  }
   
  @action findMatches() {
    if (this.searchString.length > 0)
     {
      fetch('/api/food/autocomplete/'+this.searchString)
      .then(res => res.json())
      .then(res => {
          this.matches = res;
      })
      .catch(() => {
          this.fetched = false
          console.log('bad');
      });
    //   this.matches = _.filter(obj, data => data.name.search(new RegExp(this.searchString, 'i')) > -1);
     }
    else
      this.matches.clear();
  }
};
 

export default store;