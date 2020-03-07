"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDnd = require("react-dnd");

var _ItemTypes = _interopRequireDefault(require("../ItemTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var badgeStyle = {
  position: 'relative',
  top: '-5.4rem',
  left: '2rem'
};

var DraggableImage = function DraggableImage(_ref) {
  var order = _ref.order,
      index = _ref.index,
      onClick = _ref.onClick,
      url = _ref.url,
      title = _ref.title,
      moveImage = _ref.moveImage;
  var ref = (0, _react.useRef)(null);

  var _useDrop = (0, _reactDnd.useDrop)({
    accept: _ItemTypes.default.DRAGGABLE_IMAGE,
    hover: function hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      var dragIndex = item.index;
      var hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      var hoverBoundingRect = ref.current.getBoundingClientRect();
      var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      var clientOffset = monitor.getClientOffset();
      var hoverClientY = clientOffset.y - hoverBoundingRect.top; //Dragging downwards

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      } //Dragging upwards


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      drop = _useDrop2[1];

  var _useDrag = (0, _reactDnd.useDrag)({
    item: {
      type: _ItemTypes.default.DRAGGABLE_IMAGE,
      order: order,
      index: index
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  drag(drop(ref));
  return _react.default.createElement("div", {
    ref: ref,
    "data-key": "".concat(index),
    onClick: onClick
  }, _react.default.createElement("span", {
    className: "badge badge-pill badge-dark",
    style: badgeStyle
  }, "".concat(index + 1)), _react.default.createElement("img", {
    className: "img-thumbnail",
    src: url,
    alt: title
  }));
};

var _default = DraggableImage;
exports.default = _default;