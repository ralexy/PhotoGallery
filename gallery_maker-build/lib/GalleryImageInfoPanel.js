"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var infoPanelStyle = {
  display: 'flex',
  alignItems: 'center'
};
var titleStyle = {
  fontSize: '2rem'
};
var subtitleStyle = {
  fontSize: '1.5rem'
};

var GalleryImageInfoPanel = function GalleryImageInfoPanel(_ref) {
  var title = _ref.title,
      year = _ref.year,
      artist = _ref.artist,
      description = _ref.description;
  return _react.default.createElement("div", {
    className: "info-panel",
    style: infoPanelStyle
  }, _react.default.createElement("div", {
    className: "card"
  }, _react.default.createElement("div", {
    className: "card-body"
  }, _react.default.createElement("h4", {
    className: "card-title mb-4",
    style: titleStyle
  }, title), _react.default.createElement("h5", {
    className: "card-subtitle mb-4",
    style: subtitleStyle
  }, "".concat(artist, ", ").concat(year)), _react.default.createElement("p", {
    className: "card-text"
  }, description))));
};

GalleryImageInfoPanel.propTypes = {
  title: _propTypes.default.string.isRequired,
  year: _propTypes.default.string.isRequired,
  artist: _propTypes.default.string.isRequired,
  description: _propTypes.default.string.isRequired
};
var _default = GalleryImageInfoPanel;
exports.default = _default;