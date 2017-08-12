import React, { Component } from 'react';
import logo from './logo.svg';
import firebase from 'firebase';

import FileUpload from './FileUpload';
import './App.css';

import { Button, Glyphicon } from 'react-bootstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      uploadValue: 0,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .then(result=>  window.location.reload())
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha cerrado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }


  handleUpload(event){

  const file = event.target.files[0];
  const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
  const task = storageRef.put(file);

  task.on('state_changed', snapshot =>{
    
    let percent = parseInt(snapshot.bytesTransferred / snapshot.totalBytes * 100);
   
    this.setState({
      uploadValue: percent
    })

  }, error => {console.log(error.message)
  }, ()  => {
    const record = {
      photoURL: this.state.user.photoURL,
      displayName: this.state.user.displayName,
      image: task.snapshot.downloadURL
      };

      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
  });
}


  renderLoginButton(){
    //Si usuario == logged 

    if(this.state.user){
      return (       

        <div className="container">

          <img style={{borderRadius: 50, width: 100, marginTop: "2%", marginBottom: "1%"}} src={this.state.user.photoURL} alt={this.state.user.displayName} />
          
          <p>Hola {this.state.user.displayName}</p>

          <Button bsStyle="danger"  style={{marginBottom: "2%" , marginTop: "1%"}}  onClick={this.handleLogout}> <Glyphicon glyph="off" /> Salir</Button>

          <FileUpload onUpload={this.handleUpload} uploadValue={this.state.uploadValue} />


          {
            this.state.pictures.map(picture => (

              <div className="container">

                <div className="col-md-3"></div>

                <div className="col-md-6">

                  <header style={{marginTop: "2%"}} >              
                    <img id="first" style={{borderRadius: 50, width: 33, marginTop: "1%", marginBottom: "1%" }} 
                    src={picture.photoURL} alt={picture.displayName}/>
               
                    <span id="second">{picture.displayName}</span> 
                  </header>

                  <img width="75%" style={{marginTop: "1%"}} src={picture.image} alt=""/>
                  <br/> <br/>

                </div>

                <div className="col-md-3"></div>

              </div>

              )).reverse()
          }
        </div>

        );

    }else{
    //Si usuario !logged
    return(
      <Button style={{marginTop: "2%"}} bsStyle="success"  onClick={this.handleAuth}> <Glyphicon glyph="lock" /> Login con Google</Button >
    );
      
    }


  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div id="header_logo">  <Glyphicon glyph="camera" /> </div> 
          <div id="header_text">  FsvInstagram </div>  
        </div>
        <div className="App-intro">
          {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
