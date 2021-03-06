import React, { Component } from 'react';
import './App.css';
import ImageSelector, { MOCK_GALLERY } from './ImageSelector/ImageSelector'
import GalleryOrdener from './GalleryOrdener/GalleryOrdener'
import NameForm from './GalleryNameForm'
import ReqForm from './GalleryReqForm'

const API_URL = "http://photogallery/api/";
const API_KEY = "PZvv8Mqae8jFuUa4/";
const ADD_COLLECION = "addCollection"
const EDIT_PICTURE_COLLECTION = "editPictureCollection";
const GET_COLLECTION = "?collectionName=";

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
      toFetchName: "",
      fetchedGallery: false
    };
    this.handleSaveGallery =
      this.handleSaveGallery.bind(this);
    this.fetchFromName = this.fetchFromName.bind(this)
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

  handleSaveGallery() {
    const { galleryName, galleryDesc } = this.state;
    let formdata = new FormData();
    formdata.append("postJson", "[{\"name\":\"" + galleryName + "\",\"description\":\"" + galleryDesc + "\"}]");
    fetch(API_URL + API_KEY + ADD_COLLECION, {
      method: "POST",
      body: formdata
    }).then(response => response.json())
      .then(data => {
        this.postGallery(data.result[0].collectionId);
      });
  }

  postGallery(id) {
    const { tempGallery } = this.state
    let ordered = [];
    tempGallery.map(({ pictureId, order }, i) => {
      let orderedImage = {
        "pictureId": pictureId,
        "collectionId": id,
        "orderShow": order + 1,
      }
      ordered.push(orderedImage);
    });
    console.log(ordered);

    let json = JSON.stringify(ordered);
    let formdata = new FormData();
    formdata.append("postJson", json);

    let headers = new Headers();
    fetch(API_URL + API_KEY + EDIT_PICTURE_COLLECTION,
      {
        method: "POST",
        body: formdata
      }).then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  fetchFromName() {
    const { toFetchName } = this.state;
    fetch(API_URL + API_KEY + GET_COLLECTION + toFetchName)
      .then(res => res.json())
      .then(
        (result) => {
          let gallery = [];
          result.map(({ title, year, artist, url, thumbsUrl, fileName, pictureId }, i) => {
            let orderedImage = {
              title: title,
              year: year,
              artist: artist,
              url: url,
              thumbsUrl: thumbsUrl,
              fileName: fileName,
              pictureId: pictureId,
              order: i
            }
            gallery.push(orderedImage);
          });
          let temp = this.state.jsonGallery;
          temp.forEach(function(img){
            gallery.forEach(function(fetchedimg){
              if(img.pictureId === fetchedimg.pictureId) {
                img = {
                  artist: fetchedimg.artist,
                  fileName: fetchedimg.fileName,
                  pictureId: fetchedimg.pictureId,
                  thumbsUrl: fetchedimg.thumbsUrl,
                  title: fetchedimg.title,
                  url: fetchedimg.url,
                  year: fetchedimg.year,
                  order: fetchedimg.order,
                };
                console.log(img)
              }
            })
          })
          console.log(temp)
          this.setState({
            tempGallery: gallery,
            jsonGallery: temp,
            fetchedGallery: true,
          });
          console.log(this.state.jsonGallery)
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
        }
        break;
      case 'formDesc':
        {
          this.setState({ galleryDesc: e.target.value })
        }
        break;
      default:
        break;
    }
  };

  handleFetchNameChange = (e) => {
    this.setState({ toFetchName: e.target.value })
  };

  render() {
    const { error, isLoaded, jsonGallery, galleryName, galleryDesc, fetchedGallery } = this.state;
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
            <div className="container mt-2">
              {!fetchedGallery && <ReqForm fetchFromName={this.fetchFromName} handleChange={this.handleFetchNameChange} />}
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
