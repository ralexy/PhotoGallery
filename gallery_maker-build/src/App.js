import React, { Component } from 'react';
import './App.css';
import ImageSelector, { MOCK_GALLERY } from './ImageSelector/ImageSelector'
import GalleryOrdener from './GalleryOrdener/GalleryOrdener'

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
  state = {
    tempGallery: [],
    //tempGallery: MOCK_GALLERY,
    appState: appStates.imageSelector
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
      appState: appStates.imageSelector
    });
    this.render();
  }

  renderImageSelector() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="container-fluid ml-5 mr-4">
          <ImageSelector
            parentApp={this}
            images={MOCK_GALLERY}
            currentImageIndex={0}
            tempGallery={this.state.tempGallery}
            newGalleryOnClick={this.newGalleryOnClick}
          />
        </div>
      </div>
    );
  }

  renderGalleryOrderer() {
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
          />
      </div>
    );
  }

  render() {
    if (this.state.appState === appStates.imageSelector) {
      return this.renderImageSelector();
    } else if (this.state.appState === appStates.galleryOrderer
      && !(this.state.tempGallery.length === 0)) {
      return this.renderGalleryOrderer();
    }
  }
}

export default App;
