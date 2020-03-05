"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOCK_GALLERY = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Carousel = _interopRequireDefault(require("react-bootstrap/Carousel"));

var _reactBootstrap = require("react-bootstrap/");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ImageCheckbox = _interopRequireDefault(require("./ImageCheckbox"));

var _GalleryImageInfoPanel = _interopRequireDefault(require("../GalleryImageInfoPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var resAddr = '/res/';
var fullSizeAddr = 'full_size/';
var thumbAddr = 'thumbs/';
var newGalleryAddr = "gallery/";
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var ImageSelector = function ImageSelector(props) {
  var onCheckboxClick = function onCheckboxClick(isChecked, index) {
    if (isChecked) {
      if (!props.tempGallery.includes(props.images[index])) {
        props.tempGallery.push(props.images[index]);
      }
    } else if (!isChecked) {
      if (props.tempGallery.includes(props.images[index])) {
        var i = props.tempGallery.indexOf(props.images[index]);
        props.tempGallery.splice(i, 1);
      }
    }
  };

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      direction = _useState4[0],
      setDirection = _useState4[1];

  var target = (0, _react.useRef)(null);

  var handleSelect = function handleSelect(selectedIndex, e) {
    if (selectedIndex >= 0) {
      setIndex(selectedIndex);
      setDirection(e.direction);
    }
  };

  var handleThumbSelect = function handleThumbSelect(e) {
    //e.currentTarget.setAttribute('class', "active");
    var i = parseInt(e.currentTarget.getAttribute('data-key'));
    setIndex(i);
  };

  var popover = _react.default.createElement(_reactBootstrap.Popover, {
    id: "newgallery-popover"
  }, _react.default.createElement(_reactBootstrap.Popover.Title, {
    as: "h3",
    style: {
      backgroundColor: "#ff9696"
    }
  }, "Erreur"), _react.default.createElement(_reactBootstrap.Popover.Content, {
    style: {
      backgroundColor: "#ff6464"
    }
  }, "Vous n'avez s\xE9lectionn\xE9 aucune image pour votre nouvelle gallerie."));

  return _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", {
    id: "gallery-maker-main-column",
    className: "col-md-8 jumbotron"
  }, _react.default.createElement("div", {
    className: "imageSelector"
  }, _react.default.createElement("div", {
    id: "mainCarousel",
    className: "carousel slide",
    "data-interval": "false",
    "data-ride": "carousel"
  }, _react.default.createElement("ol", {
    className: "carousel-indicators overflow-auto"
  }, props.images.map(function (_ref, i) {
    _objectDestructuringEmpty(_ref);

    return _react.default.createElement("li", {
      className: "".concat(i === index ? "active" : ""),
      key: i
    }, _react.default.createElement("div", {
      className: "input-group"
    }, _react.default.createElement("div", {
      className: "input-group-prepend"
    }, _react.default.createElement(_ImageCheckbox.default, {
      imageIndex: i,
      onCheckboxClick: onCheckboxClick,
      ordered: props.images[i].hasOwnProperty('order')
    }))), _react.default.createElement("img", {
      "data-target": "#mainCarousel",
      "data-key": "".concat(i),
      "data-slide-to": "".concat(i),
      src: resAddr + thumbAddr + props.images[i].url,
      alt: props.images[i].title,
      className: "img-thumbnail",
      onClick: handleThumbSelect
    }));
  })), _react.default.createElement("div", {
    style: {
      margin: "1em"
    }
  }, _react.default.createElement(_reactBootstrap.OverlayTrigger, {
    trigger: "focus",
    placement: "right",
    overlay: popover
  }, _react.default.createElement(_reactBootstrap.Button, {
    ref: target,
    onClick: props.newGalleryOnClick,
    variant: "primary"
  }, "Prendre les images s\xE9lectionn\xE9es pour former une nouvelle gallerie"))), _react.default.createElement(_Carousel.default, {
    activeIndex: index,
    slide: false,
    indicators: false,
    direction: direction,
    onSelect: handleSelect,
    interval: null,
    controls: true
  }, props.images.map(function (_ref2, index) {
    _objectDestructuringEmpty(_ref2);

    return _react.default.createElement(_Carousel.default.Item, null, _react.default.createElement("img", {
      src: resAddr + fullSizeAddr + props.images[index].url,
      alt: props.images[index].url,
      className: "img-fluid d-block"
    }));
  }))))), _react.default.createElement("div", {
    id: "gallery-maker-side-panel",
    className: "col-md-3 jumbotron"
  }, _react.default.createElement(_GalleryImageInfoPanel.default, {
    title: props.images[index].title,
    year: props.images[index].year,
    artist: props.images[index].artist,
    description: props.images[index].description
  })));
};

ImageSelector.propTypes = {
  parentApp: _propTypes.default.object.isRequired,
  images: _propTypes.default.arrayOf(_propTypes.default.shape({
    url: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    year: _propTypes.default.string.isRequired,
    artist: _propTypes.default.string.isRequired,
    description: _propTypes.default.string.isRequired
  })).isRequired,
  currentImageIndex: _propTypes.default.number.isRequired,
  tempGallery: _propTypes.default.array.isRequired,
  newGalleryOnClick: _propTypes.default.func.isRequired
};
var _default = ImageSelector;
exports.default = _default;
var MOCK_GALLERY = [{
  url: "1.jpg",
  title: "Les Demoiselles d'Avignon",
  year: "1924",
  artist: "Pablo Picasso",
  description: loremIpsum
}, {
  url: "2.jpg",
  title: "Guernica",
  year: "1934",
  artist: "Pablo Picasso",
  description: loremIpsum
}, {
  url: "3.jpg",
  title: "Tructruc",
  year: "1920",
  artist: "Chelouzar",
  description: loremIpsum
}, {
  url: "4.jpg",
  title: "Vielle dame",
  year: "1864",
  artist: "Un mec",
  description: loremIpsum
}, {
  url: "Mona_Lisa.jpg",
  title: "La Joconde",
  year: "1540",
  artist: "Léonard De Vinci",
  description: loremIpsum
}, {
  url: "Nicolas_Poussin_-_Le_massacre_des_Innocents.jpg",
  title: "Le massacre des innoncents",
  year: "1625-1626",
  artist: "Nicolas Poussin",
  description: loremIpsum
}, {
  url: "Bacon_by_Gray_257.jpg",
  title: "Portrait of Francis Bacon",
  year: "1960",
  artist: "Reginald Gray",
  description: loremIpsum
}, {
  url: "Mathis_Gothart_Grünewald_062.jpg",
  title: "Le Christ outragé",
  year: "1503-1505",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Edouard_Manet,_A_Bar_at_the_Folies-Bergère.jpg",
  title: "Un bar aux Folies Bergère",
  year: "1882",
  artist: "Édouard Manet",
  description: loremIpsum
}, {
  url: "NPG_NPG_5205-001.jpg",
  title: "Man's Head (Self Portrait III)",
  year: "1963",
  artist: "Lucian Freud",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "Grunewald_Isenheim1.jpg",
  title: "Retable d'Issenheim",
  year: "1512-1516",
  artist: "Mathias Grünewald",
  description: loremIpsum
}, {
  url: "PARR-Martin-New-Brighton-Merseyside-The-Last-Resort.jpg",
  title: "New Brighton Merseyside (Série The Last Resort)",
  year: "1983-1985",
  artist: "Martin Parr",
  description: loremIpsum
}];
exports.MOCK_GALLERY = MOCK_GALLERY;