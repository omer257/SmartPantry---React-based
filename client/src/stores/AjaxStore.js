
import {observable, action, computed  } from "mobx"
import _ from 'underscore';
import fetch from 'isomorphic-fetch';

let obj = [
    {
        "name": "cocoa",
        "image": "cocoa-powder.jpg"
    },
    {
        "name": "coconut",
        "image": "coconut.jpg"
    },
    {
        "name": "coconut oil",
        "image": "oil-coconut.jpg"
    },
    {
        "name": "cocoa nibs",
        "image": "cacao-nibs.png"
    },
    {
        "name": "coconut rum",
        "image": "no.jpg"
    },
    {
        "name": "coco sugar",
        "image": "coconut-sugar.jpg"
    },
    {
        "name": "coconut milk",
        "image": "coconut-milk.jpg"
    },
    {
        "name": "coconut flour",
        "image": "coconut-flour-or-other-gluten-free-flour.jpg"
    },
    {
        "name": "coconut cream",
        "image": "coconut-cream.jpg"
    },
    {
        "name": "coconut water",
        "image": "coconut-water.jpg"
    }
];

// Main Store for credit card form
// This store is passed as a prop to <App />
const store = new class Store {
  @observable dataSet = obj;
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
          console.log(res)
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