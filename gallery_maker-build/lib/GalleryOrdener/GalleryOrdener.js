"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("react-bootstrap/Button"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _GalleryImageInfoFormPanel = _interopRequireDefault(require("./GalleryImageInfoFormPanel"));

var _DraggableImage = _interopRequireDefault(require("./DraggableImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var resAddr = '/res/';
var thumbAddr = 'thumbs/';
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function GalleryOrdener(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      clicked = _useState2[0],
      setClick = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      index = _useState4[0],
      setIndex = _useState4[1];

  var _useState5 = (0, _react.useState)(props.newGallery),
      _useState6 = _slicedToArray(_useState5, 2),
      gallery = _useState6[0],
      setGallery = _useState6[1];

  var style = {
    paddingLeft: "0em",
    paddingRight: "0em"
  };

  var imageOnClick = function imageOnClick(e) {
    setClick(true);
    var i = parseInt(e.currentTarget.getAttribute('data-key'));
    setIndex(i);
  };

  var handleChange = function handleChange(e) {
    switch (e.target.id) {
      case 'formTitle':
        {
          var tempGallery = gallery;
          tempGallery[index].title = e.target.value;
          setGallery(tempGallery);
        }
        break;

      case 'formYear':
        {
          var _tempGallery = gallery;
          _tempGallery[index].year = e.target.value;
          setGallery(_tempGallery);
        }
        break;

      case 'formArtist':
        {
          var _tempGallery2 = gallery;
          _tempGallery2[index].artist = e.target.value;
          setGallery(_tempGallery2);
        }
        break;

      case 'formDescription':
        {
          var _tempGallery3 = gallery;
          _tempGallery3[index].description = e.target.value;
          setGallery(_tempGallery3);
        }
        break;

      default:
        break;
    }
  };

  var moveImage = (0, _react.useCallback)(function (dragIndex, hoverIndex) {
    var dragImage = gallery[dragIndex];
    setGallery((0, _immutabilityHelper.default)(gallery, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragImage]]
    }));
  }, [gallery]);
  return _react.default.createElement("div", {
    className: "container-fluid ml-1 mr-1"
  }, _react.default.createElement("div", {
    className: "row",
    style: {
      justifyContent: "center",
      padding: "1em"
    }
  }, _react.default.createElement(_Button.default, {
    variant: "primary"
  }, "Sauvegarder la galerie")), _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", {
    id: "gallery-maker-backbutton",
    style: style
  }, _react.default.createElement(_Button.default, {
    variant: "secondary",
    size: "lg",
    style: {
      borderRadius: "2em"
    },
    onClick: function onClick() {
      props.handleBackClick(gallery);
    }
  }, "\u276E")), _react.default.createElement("div", {
    id: "gallery-maker-main-column",
    className: "col-md-8 jumbotron",
    style: {
      paddingTop: "1em"
    }
  }, _react.default.createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.default
  }, _react.default.createElement("div", {
    className: "row"
  }, gallery.map(function (image, i) {
    return _react.default.createElement(_DraggableImage.default, {
      order: image.order,
      index: i,
      onClick: imageOnClick,
      url: resAddr + thumbAddr + image.url,
      title: image.title,
      moveImage: moveImage
    });
  })))), _react.default.createElement("div", {
    id: "gallery-maker-side-panel",
    className: "col-md-3 jumbotron",
    style: style
  }, clicked && _react.default.createElement(_GalleryImageInfoFormPanel.default, {
    handleChange: handleChange,
    title: gallery[index].title,
    year: gallery[index].year,
    artist: gallery[index].artist,
    description: loremIpsum
  }))));
}

GalleryOrdener.propTypes = {
  newGallery: _propTypes.default.arrayOf(_propTypes.default.shape({
    url: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired,
    year: _propTypes.default.string.isRequired,
    artist: _propTypes.default.string.isRequired
  })).isRequired,
  handleBackClick: _propTypes.default.isRequired
};
var _default = GalleryOrdener;
exports.default = _default;