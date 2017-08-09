import React from 'react';
import {observable, action} from "mobx"
import {observer, inject} from "mobx-react"

@inject('store')
@observer
class AutoComplete extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        width: 0
      }
    };
  }

  @observable openMenu = false;
  @observable selectedItemIndex = 0;
  @action resetMenu() {
    this.selectedItemIndex = 0;
    this.openMenu = false;
    this.props.store.selectedItem = {};
    this._menuSize();
    this._input.value = '';
  }

  @action closeMenu() {
    this.selectedItemIndex = 0;
    this.openMenu = false;
  }

  componentDidMount() {
    if(this.props.value){
      this.props.store.searchString = this.props.value;
      this._onChangeLoad();
    }
    this._menuSize();
    window.addEventListener('resize', this._onWindowResize);
    document.addEventListener('keyup', this._keyUp);
    window.addEventListener('click', this._mouseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._keyUp);
    window.removeEventListener('resize', this._onWindowResize);
    window.removeEventListener('click', this._mouseClick);
  }

  _mouseClick = (e) => {
    if (this.openMenu === true) {
      if (e.target.parentNode.className !== 'autocomplete' && e.target.className !== "text-box") {
        this.closeMenu();
      }
    } else if (this.openMenu === false && e.target.className === 'text-box' && this.props.store.searchString.length > 0) {
      this.openMenu = true;
    }
  };

  _keyUp = (e) => {
    //console.log(e.keyCode || e.which); esc
    if (e.keyCode === 27 || e.which === 27) {
      this.closeMenu();
    }
    // up arrow
    if (e.keyCode === 38 || e.which === 38) 
      this._upArrow();
    
    // down arrow
    if (e.keyCode === 40 || e.which === 40) {
      this._downArrow();
    }
    // enter key
    if (e.keyCode === 13 || e.which === 13) {
      if (this.openMenu === true) {
        e.preventDefault();
        if (this.props.store.isItemSelected) {
          this._selectItem();
          this.openMenu = false;
        }
      }
    }
  };

  _onWindowResize = (e) => {
    this._menuSize();
  };

  _onChange = (e) => {
    this.props.store.searchString = this._input.value;
    if (this.props.store.searchString.length > 2) {
      fetch(this.props.store.findMatches()).then((res) => {
        if (this.props.store.matches.length > 0) 
          this.openMenu = true;
        else 
          this.openMenu = true;
        }
      )
    }

    this.props.onChange(this._input.value);//Feed parant
  };

  _onChangeLoad = (e) => {
    if (this.props.store.searchString.length > 2) {
      fetch(this.props.store.findMatches()).then((res) => {
        if (this.props.store.matches.length > 0) 
          this.openMenu = true;
        else 
          this.openMenu = true;
        }
      )
    }

    this.props.onChange(this._input.value);//Feed parant
  };

  _upArrow(e) {
    //console.log('up', this.selectedItemIndex-1);
    if (this.openMenu === true && this.selectedItemIndex > 1) {
      this.selectedItemIndex = this.selectedItemIndex - 1;
      this.props.store.selectedItem = this.props.store.matches[this.selectedItemIndex - 1];
      this._selectItem();
    } else if (this.openMenu === true && this.selectedItemIndex < 1) 
      this.openMenu = false;
    }
  
  _downArrow(e) {
    //console.log('down', this.selectedItemIndex + 1);
    if (this.props.store.searchString.length > 0 && this.openMenu === false) {
      this._onChange(e);
    }

    if (this.selectedItemIndex < this.props.store.matches.length) {
      this.selectedItemIndex = this.selectedItemIndex + 1;
      this.props.store.selectedItem = this.props.store.matches[this.selectedItemIndex - 1];
      this._selectItem();
    }
  }

  _menuSize() {
    let pos = this
      ._input
      .getBoundingClientRect();
    this.setState({
      style: {
        width: parseInt(pos.width, 10)
      }
    });
  }

  _selectItem() {
    this._input.value = this.props.store.selectedItem.name;
    this.props.onChange(this._input.value);//Feed parant
  }

  _selectItemByClick = (e, data) => {
    e.preventDefault();
    this.props.store.selectedItem = data;
    this._selectItem();
    this.openMenu = false;
  };

  _renderList() {
    return this
      .props
      .store
      .matches
      .map((data) => (
        <li
          key={data.name}
          onClick={e => this._selectItemByClick(e, data)}
          className={this.props.store.selectedItem.name === data.name
          ? 'highlight'
          : ''}>
          {data.name}
        </li>
      ))
  }

  _renderMenu() {
    let element = (
      <ul className="autocomplete" style={this.state.style}>
        {this._renderList()}
      </ul>
    );
    return React.cloneElement(element);
  }

  render() {
    return (
          <div className="form-input">
            <input required
              type="text"
              name={this.props.name}
              className="form-control"
              autoComplete="off"
              placeholder="Type something, e.g. Banana"
              ref={i => this._input = i}
              onChange={this._onChange}/> {this.openMenu && this._renderMenu()}
          </div>
    );
  }
}
 

export default AutoComplete;