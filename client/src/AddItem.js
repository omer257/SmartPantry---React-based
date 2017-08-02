import React, { Component } from 'react';
import './App.css'; 

class App extends Component {

  render() {
    return (
      <div className="App">
            <form ref='uploadForm' 
      id='uploadForm' 
      action='/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="text" name="text" /><br />
        <input type="file" name="sampleFile" /><br />
        <input type='submit' value='Upload!' />
    </form> 
      </div>
    );
  }
}

export default App;