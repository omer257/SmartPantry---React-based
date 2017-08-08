import React, {Component} from 'react';



class App extends Component {
  // Initialize state
  constructor(props) {
      super(props);
      this.state = {
          user: null
      }
  }
  render() {
    return (
      <div className="row">
       <div className="col-md-12">
          <h1>Smart pantry</h1>
          
       </div>
      </div> 
    );
  }
}

export default App;