"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _util = require("./util");
var _ImageViewer2 = _interopRequireDefault(require("./ImageViewer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var fullScreenHtml = "\n  <div class=\"iv-fullscreen-container\"></div>\n  <div class=\"iv-fullscreen-close\"></div>\n";
var FullScreenViewer = /*#__PURE__*/function (_ImageViewer) {
  _inherits(FullScreenViewer, _ImageViewer);
  var _super = _createSuper(FullScreenViewer);
  function FullScreenViewer() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FullScreenViewer);
    var fullScreenElem = (0, _util.createElement)({
      tagName: 'div',
      className: 'iv-fullscreen',
      html: fullScreenHtml,
      parent: document.body
    });
    var container = fullScreenElem.querySelector('.iv-fullscreen-container');

    // call the ImageViewer constructor
    _this = _super.call(this, container, _objectSpread(_objectSpread({}, options), {}, {
      refreshOnResize: false
    }));

    // add fullScreenElem on element list
    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      // hide the fullscreen
      (0, _util.css)(_this._elements.fullScreen, {
        display: 'none'
      });

      // enable scroll
      (0, _util.removeCss)(document.querySelector('html'), 'overflow');

      // remove window event
      _this._events.onWindowResize();
    });
    _this._elements.fullScreen = fullScreenElem;
    _this._initFullScreenEvents();
    return _this;
  }
  _createClass(FullScreenViewer, [{
    key: "_initFullScreenEvents",
    value: function _initFullScreenEvents() {
      var fullScreen = this._elements.fullScreen;
      var closeBtn = fullScreen.querySelector('.iv-fullscreen-close');

      // add close button event
      this._events.onCloseBtnClick = (0, _util.assignEvent)(closeBtn, 'click', this.hide);
    }
  }, {
    key: "show",
    value: function show(imageSrc, hiResImageSrc) {
      // show the element
      (0, _util.css)(this._elements.fullScreen, {
        display: 'block'
      });

      // if image source is provide load image source
      if (imageSrc) {
        this.load(imageSrc, hiResImageSrc);
      }

      // handle window resize
      this._events.onWindowResize = (0, _util.assignEvent)(window, 'resize', this.refresh);

      // disable scroll on html
      (0, _util.css)(document.querySelector('html'), {
        overflow: 'hidden'
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var fullScreen = this._elements.fullScreen;

      // destroy image viewer
      _get(_getPrototypeOf(FullScreenViewer.prototype), "destroy", this).call(this);

      // remove the element
      (0, _util.remove)(fullScreen);
    }
  }]);
  return FullScreenViewer;
}(_ImageViewer2["default"]);
var _default = exports["default"] = FullScreenViewer;