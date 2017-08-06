import React, { Component } from 'react';

import {Link} from 'react-router-dom'; //Calling link to bind with router
class App extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {item: [],fetching: false ,fetched: false};
  }
  
  uploadAction(ev) {
        let that = this;
        that.setState({ fetching:true })
        var form = document
            .forms
            .namedItem("myForm");
        var oData = new FormData(form);

        var oReq = new XMLHttpRequest();
        oReq.open("POST", "/upload", true);
        oReq.onload = function (oEvent) {
            if (oReq.status === 200) {
              let data = JSON.parse(oReq.response);
              let parseAgain = JSON.parse(data)
              that.setState({ item:parseAgain['0'].classes,fetched:true,fetching:false })
            } else {
                console.log('Bad');
            }
        }
        oReq.send(oData);
        ev.preventDefault();
    }

  render() {
    const { item,fetching,fetched } = this.state;
    let ajaxImage = null; 
    if(fetching){
       ajaxImage = 'http://media.giphy.com/media/LPBYImbgzsKpG/giphy.gif';
    }
    else
    {
       ajaxImage = '';
    }
    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {fetched ? (
          <div> 
             <h1>One of those?</h1>
          {item.map((item,index)=>
          <Link to={"/AddIngredient/"+item.class}  className="btn btn-default btn-block" key={index}>{item.class} -{item.score}</Link>)}
           <Link to="/AddIngredient/"  className="btn btn-danger btn-block">Couldnt get it... whoops :(</Link>
           </div>
        ) : (
          // Render a helpful message otherwise
          
          <div>
                <h1>Upload image</h1>
                <form onSubmit={this
                    .uploadAction
                    .bind(this)}
                id='myForm'
                name='myForm'
                action='upload'
                method='post'
                encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="email">Upload image</label>
                         <input type="file" id="myFile" name="myFile" required/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form> 
                <img src={ajaxImage} alt=""/>
            </div>
        )}
      </div>
    );
  }
}

export default App;