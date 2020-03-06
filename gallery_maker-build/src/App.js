import React, { Component } from 'react';
import './App.css';
import ImageSelector, { MOCK_GALLERY } from './ImageSelector/ImageSelector'
import GalleryOrdener from './GalleryOrdener/GalleryOrdener'
import NameForm from './GalleryNameForm'

const RES_DIR = './res/';
const FULL_SIZE_DIR = 'full_size/';
const THUMB_DIR = 'thumbs/';
const newGalleryAddr = "gallery/";

const API_URL = "http://photogallery/api/";
const API_KEY = "PZvv8Mqae8jFuUa4/";

export { RES_DIR, FULL_SIZE_DIR, THUMB_DIR };

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
      galleryName: "",
      galleryDesc: "",
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
    let galleryId;
    fetch(API_URL, {
      method: "POST",
      body: [{
        "name": this.state.galleryName,
        "description": this.state.galleryDesc
      }]
    }).then(function (response) {
      if (response.ok) {
        console.log(response);
        responseObj = JSON.parse(response.json);
        galleryId = responseObj.collectionId
      }
    });

    let toSend = {
      postJson: this.state.tempGallery
    }
    let json = JSON.stringify(toSend);
    let headers = new Headers();
    fetch(API_URL + API_KEY, {
      method: "POST",
      body: json
    }).then(function (response) {
      if (response.ok) {
        console.log(response);
        alert("Requête OK");

      }
    });
  }

  renderImageSelector() {
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
        <div className="container mt-2">
              <NameForm name={this.state.galleryName} desc={this.state.galleryDesc} handleChange={this.handleNameDescChange} />
            </div>
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

  handleNameDescChange = (e) => {
    switch (e.target.id) {
      case 'formName':
        {
          this.setState({ galleryName: e.target.value })
          console.log(this.state.galleryName)
        }
        break;
      case 'formDesc':
        {
          this.setState({ galleryDesc: e.target.value })
          console.log(this.state.galleryDesc)
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { error, isLoaded, jsonGallery, galleryName, galleryDesc } = this.state;
    if (error) {
      return (
        <p>Erreur</p>
      );
    } else if (!isLoaded) {
      return (
        <p>Echec chargement</p>
      );
    } else {
      if (this.state.appState === appStates.imageSelector) {
        return (
          <div className="App">
            <header className="App-header">
            </header>
            <div className="container mt-2">
              <NameForm name={galleryName} desc={galleryDesc} handleChange={this.handleNameDescChange} />
            </div>
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
