import React from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router
import {inject, observer} from 'mobx-react';

@inject('AuthStore', 'ingredientsStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.user===""){
    this.setState({user:this.props.AuthStore.authUser()})
    this.props.ingredientsStore.getData();//Such a hack : 
    }
  }
  render() {
    // const { pathname } = this.props.location
    this
      .props
      .AuthStore
      .authUser()
    return (
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              Menu&nbsp;
              <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" to="/">Smart pantry</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <Link to="/">Home</Link>
              </li>
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
            </ul>
            <ul className="nav navbar-nav navbar-right">
              
              <li>
                <Link to="/RegLogin">{this.state.user
                    ? 'Logout'
                    : 'Login'}</Link>
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