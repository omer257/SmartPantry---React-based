import React from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import firebase from 'firebase'
import {inject, observer} from 'mobx-react';

@inject('AuthStore','ingredientsStore')
@observer
class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }
  componentWillUpdate(nextProps, nextState){
    // if(nextState.user===""){
    //   this.setState({user: this.props.AuthStore.authUser()})
    //   this.props.ingredientsStore.getData();//Such a hack :
    // }
  }
  render() {
    // const { pathname } = this.props.location
    this.props.AuthStore.authUser()
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Food App</Link>

          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/about">about</Link>
              </li>
              <li>
                <Link to="/AddIngredient">AddIngredient</Link>
              </li>
              <li>
                <Link to="/ingredientsList">My ingredients</Link>
              </li>
              <li>
                <Link to="/RecipesList">RecipesList</Link>
              </li>
              <li>
                <Link to="/RegLogin">RegLogin</Link>
              </li>
              <li>
                <Link to="/test">{this.state.user?'Logout':'Login'}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
// 
export default App;