"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _util = require("./util");
var _ImageViewer2 = _interopRequireDefault(require("./ImageViewer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var fullScreenHtml = "\n  <div class=\"iv-fullscreen-container\"></div>\n  <div class=\"iv-fullscreen-close\"></div>\n";
var FullScreenViewer = /*#__PURE__*/function (_ImageViewer) {
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
    _this = _callSuper(this, FullScreenViewer, [container, _objectSpread(_objectSpread({}, options), {}, {
      refreshOnResize: false
    })]);

    // add fullScreenElem on element list
    _defineProperty(_this, "hide", function () {
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
  _inherits(FullScreenViewer, _ImageViewer);
  return _createClass(FullScreenViewer, [{
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
}(_ImageViewer2["default"]);
var _default = exports["default"] = FullScreenViewer;