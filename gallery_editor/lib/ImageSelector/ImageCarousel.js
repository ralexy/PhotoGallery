"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resAddr = '/res/';
var fullSizeAddr = 'full_size/';

var ImageCarousel = function ImageCarousel(_ref) {
  var images = _ref.images,
      currentImageIndex = _ref.currentImageIndex;
  return _react.default.createElement("div", {
    className: "carousel-inner"
  }, images.map(function (_ref2, index) {
    var url = _ref2.url,
        title = _ref2.title;
    return _react.default.createElement("div", {
      className: "carousel-item ".concat(index === currentImageIndex ? "active" : ""),
      key: index
    }, _react.default.createElement("img", {
      src: resAddr + fullSizeAddr + images[index].url,
      alt: images[index].title,
      className: "img-fluid d-block"
    }));
  }), _react.default.createElement("a", {
    className: "carousel-control-prev",
    href: "#mainCarousel",
    role: "button",
    "data-slide": "prev"
  }, _react.default.createElement("span", {
    className: "carousel-control-prev-icon",
    "aria-hidden": "true"
  }), _react.default.createElement("span", {
    className: "sr-only"
  }, "Previous")), _react.default.createElement("a", {
    className: "carousel-control-next",
    href: "#mainCarousel",
    role: "button",
    "data-slide": "next"
  }, _react.default.createElement("span", {
    className: "carousel-control-next-icon",
    "aria-hidden": "true"
  }), _react.default.createElement("span", {
    className: "sr-only"
  }, "Next")));
};

ImageCarousel.propTypes = {
  images: _propTypes.default.arrayOf(_propTypes.default.shape({
    url: _propTypes.default.string.isRequired,
    title: _propTypes.default.string.isRequired
  })).isRequired,
  currentImageIndex: _propTypes.default.number.isRequired
};
var _default = ImageCarousel;
exports.default = _default;