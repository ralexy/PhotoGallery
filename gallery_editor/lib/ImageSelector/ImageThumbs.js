"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ImageCheckbox = _interopRequireDefault(require("./ImageCheckbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var resAddr = '/res/';
var thumbAddr = 'thumbs/';

var ImageThumbs = function ImageThumbs(_ref) {
  var images = _ref.images,
      currentImageIndex = _ref.currentImageIndex,
      onCheckboxClick = _ref.onCheckboxClick;
  return _react.default.createElement("ol", {
    className: "carousel-indicators overflow-auto"
  }, images.map(function (_ref2, index) {
    _objectDestructuringEmpty(_ref2);

    return _react.default.createElement("li", {
      className: "".concat(index === currentImageIndex ? "active" : ""),
      key: index
    }, _react.default.createElement("div", {
      className: "input-group"
    }, _react.default.createElement("div", {
      className: "input-group-prepend"
    }, _react.default.createElement(_ImageCheckbox.default, {
      imageIndex: index,
      onCheckboxClick: onCheckboxClick
    }))), _react.default.createElement("img", {
      "data-target": "#mainCarousel",
      "data-slide-to": "".concat(index),
      src: resAddr + thumbAddr + images[index].url,
      alt: images[index].title,
      className: "img-thumbnail",
      onClick: function onClick(e) {
        console.log(currentImageIndex);
      }
    }));
  }));
};

ImageThumbs.propTypes = {
  images: _propTypes.default.arrayOf(_propTypes.default.shape({
    url: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired
  })).isRequired,
  currentImageIndex: _propTypes.default.number.isRequired,
  onCheckboxClick: _propTypes.default.func.isRequired
};
var _default = ImageThumbs;
exports.default = _default;