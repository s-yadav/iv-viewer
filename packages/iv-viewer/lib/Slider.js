"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _util = require("./util");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Slider = /*#__PURE__*/function () {
  function Slider(container, _ref) {
    var _this = this;
    var _onStart = _ref.onStart,
      _onMove = _ref.onMove,
      onEnd = _ref.onEnd,
      isSliderEnabled = _ref.isSliderEnabled;
    _classCallCheck(this, Slider);
    _defineProperty(this, "startHandler", function (eStart) {
      if (!_this.isSliderEnabled()) return;
      _this.removeListeners();
      eStart.preventDefault();
      var moveHandler = _this.moveHandler,
        endHandler = _this.endHandler,
        onStart = _this.onStart;
      var isTouchEvent = eStart.type === 'touchstart' || eStart.type === 'touchend';
      _this.touchMoveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
      _this.touchEndEvent = isTouchEvent ? 'touchend' : 'mouseup';
      _this.sx = isTouchEvent ? eStart.touches[0].clientX : eStart.clientX;
      _this.sy = isTouchEvent ? eStart.touches[0].clientY : eStart.clientY;
      onStart(eStart, {
        x: _this.sx,
        y: _this.sy
      });

      // add listeners
      document.addEventListener(_this.touchMoveEvent, moveHandler);
      document.addEventListener(_this.touchEndEvent, endHandler);
      /*
        add end handler in context menu as well.
        As mouseup event is not trigger on context menu open
        https://bugs.chromium.org/p/chromium/issues/detail?id=506801
      */
      document.addEventListener('contextmenu', endHandler);
    });
    _defineProperty(this, "moveHandler", function (eMove) {
      if (!_this.isSliderEnabled()) return;
      eMove.preventDefault();
      var sx = _this.sx,
        sy = _this.sy,
        onMove = _this.onMove;
      var isTouchEvent = _this.touchMoveEvent === 'touchmove';

      // get the coordinates
      var mx = isTouchEvent ? eMove.touches[0].clientX : eMove.clientX;
      var my = isTouchEvent ? eMove.touches[0].clientY : eMove.clientY;
      onMove(eMove, {
        dx: mx - sx,
        dy: my - sy,
        mx: mx,
        my: my
      });
    });
    _defineProperty(this, "endHandler", function () {
      if (!_this.isSliderEnabled()) return;
      _this.removeListeners();
      _this.onEnd();
    });
    this.container = container;
    this.isSliderEnabled = isSliderEnabled;
    this.onStart = _onStart || _util.noop;
    this.onMove = _onMove || _util.noop;
    this.onEnd = onEnd || _util.noop;
  }
  return _createClass(Slider, [{
    key: "removeListeners",
    value:
    // remove previous events if its not removed
    // - Case when while sliding mouse moved out of document and released there
    function removeListeners() {
      if (!this.touchMoveEvent) return;
      document.removeEventListener(this.touchMoveEvent, this.moveHandler);
      document.removeEventListener(this.touchEndEvent, this.endHandler);
      document.removeEventListener('contextmenu', this.endHandler);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;
      ['touchstart', 'mousedown'].forEach(function (evt) {
        _this2.container.addEventListener(evt, _this2.startHandler);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;
      ['touchstart', 'mousedown'].forEach(function (evt) {
        _this3.container.removeEventListener(evt, _this3.startHandler);
      });
      this.removeListeners();
    }
  }]);
}();
var _default = exports["default"] = Slider;