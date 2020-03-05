"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Form = _interopRequireDefault(require("react-bootstrap/Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoFormPanel = function InfoFormPanel(_ref) {
  var handleChange = _ref.handleChange,
      title = _ref.title,
      year = _ref.year,
      artist = _ref.artist,
      description = _ref.description;
  return _react.default.createElement(_Form.default, null, _react.default.createElement(_Form.default.Group, {
    controlId: "formTitle"
  }, _react.default.createElement(_Form.default.Label, null, "Titre"), _react.default.createElement(_Form.default.Control, {
    type: "text",
    value: title,
    onChange: handleChange
  })), _react.default.createElement(_Form.default.Group, {
    controlId: "formYear"
  }, _react.default.createElement(_Form.default.Label, null, "Ann\xE9e"), _react.default.createElement(_Form.default.Control, {
    type: "text",
    value: year,
    onChange: handleChange
  })), _react.default.createElement(_Form.default.Group, {
    controlId: "formArtist"
  }, _react.default.createElement(_Form.default.Label, null, "Artiste"), _react.default.createElement(_Form.default.Control, {
    type: "text",
    value: artist,
    onChange: handleChange
  })), _react.default.createElement(_Form.default.Group, {
    controlId: "formDesc"
  }, _react.default.createElement(_Form.default.Label, null, "Description"), _react.default.createElement(_Form.default.Control, {
    as: "textarea",
    value: description,
    onChange: handleChange,
    rows: "10"
  })));
};

InfoFormPanel.propTypes = {
  handleChange: _propTypes.default.func.isRequired,
  title: _propTypes.default.string.isRequired,
  year: _propTypes.default.string.isRequired,
  artist: _propTypes.default.string.isRequired,
  description: _propTypes.default.string.isRequired
};
var _default = InfoFormPanel;
exports.default = _default;