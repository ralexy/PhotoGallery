import React, { Component } from 'react';
import './App.css';
import ImageSelector, { MOCK_GALLERY } from './ImageSelector/ImageSelector'
import GalleryOrdener from './GalleryOrdener/GalleryOrdener'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const RES_DIR = './res/';
const FULL_SIZE_DIR = 'full_size/';
const THUMB_DIR = 'thumbs/';
const newGalleryAddr = "gallery/";


export {RES_DIR, FULL_SIZE_DIR, THUMB_DIR};

const appStates = {
  "imageSelector": "imageSelector",
  "galleryOrderer": "galleryOrderer"
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      jsonGallery: [],
      tempGallery: [],
      appState: appStates.imageSelector,
    };
  }

  newGalleryOnClick = (e) => {
    if (this.state.tempGallery.length !== 0) {
      this.setState({
        appState: appStates.galleryOrderer,
      });
      this.render();
    }
  }

  handleBackClick = (tempGallery) => {
    this.setState({
      tempGallery: tempGallery,
      appState: appStates.imageSelector,
      show: false,
    });
    this.render();
  }

  handleSaveGallery = () => {
    let toSend = {postJson: this.state.tempGallery}
    let json = JSON.stringify(toSend);
    let headers = new Headers();
    fetch("http://photogallery/api/PZvv8Mqae8jFuUa4/", {
      method: "POST",
      body: json
    }).then(function(response) {
      if(response.ok) {
        console.log(response);
        alert("Requête OK");

      }
    });
  }

  renderImageSelector () {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="container-fluid ml-5 mr-4">
          <ImageSelector
            parentApp={this}
            images={jsonGallery}
            currentImageIndex={0}
            tempGallery={this.state.tempGallery}
            newGalleryOnClick={this.newGalleryOnClick}
          />
        </div>
      </div>
    );
  }

  renderGalleryOrderer () {
    let orderedTempGallery = this.state.tempGallery;
    let i = 0;
    orderedTempGallery.forEach(function (image) {
      image.order = i;
      i++;
    });
    return (
      <div className="App">
        <header className="App-header">
        </header>
          <GalleryOrdener
            newGallery={orderedTempGallery}
            handleBackClick={this.handleBackClick}
            handleSaveGallery={this.handleSaveGallery}
          />
      </div>
    );
  }

  componentDidMount() {
      fetch("http://photogallery/api/PZvv8Mqae8jFuUa4/")
        .then(res => res.json())
        .then(
          (result) => {
            let gallery = result;
            this.setState({
              isLoaded: true,
              jsonGallery: gallery,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  render (){
    const { error, isLoaded, jsonGallery } = this.state;
    if (error){
      return (
        <p>Erreur</p>
      );
    } else if (!isLoaded){
      return (
        <p>Echec chargement</p>
      );
    } else {
      if (this.state.appState === appStates.imageSelector) {
        return (
          <div className="App">
            <header className="App-header">
            </header>
            <div className="container-fluid ml-5 mr-4">
              <ImageSelector
                parentApp={this}
                images={jsonGallery}
                currentImageIndex={0}
                tempGallery={this.state.tempGallery}
                newGalleryOnClick={this.newGalleryOnClick}
              />
            </div>
          </div>
        );
      } else if (this.state.appState === appStates.galleryOrderer
        && !(this.state.tempGallery.length === 0)) {
        return this.renderGalleryOrderer();
      }
    }
  }
}

export default App;
