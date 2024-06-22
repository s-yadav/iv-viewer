"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FullScreenViewer", {
  enumerable: true,
  get: function get() {
    return _FullScreen["default"];
  }
});
Object.defineProperty(exports, "ImageViewer", {
  enumerable: true,
  get: function get() {
    return _ImageViewer["default"];
  }
});
exports["default"] = void 0;
var _ImageViewer = _interopRequireDefault(require("./ImageViewer"));
var _FullScreen = _interopRequireDefault(require("./FullScreen"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = _ImageViewer["default"];