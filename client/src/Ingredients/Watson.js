import React, { Component } from 'react';
import '../App.css'; 

class App extends Component {
  // Initialize state
  state = { item: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/watson')
      .then(res => res.json())
      .then(item => this.setState({ item }));
  }

  render() {
    const { item } = this.state;
    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {item.length ? (
          <div>
            <ul className="passwords">
              {item}
            </ul>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>Asking watson</h1>
            <img src="http://media.giphy.com/media/LPBYImbgzsKpG/giphy.gif" alt=""/>
          </div>
        )}
      </div>
    );
  }
}

export default App;