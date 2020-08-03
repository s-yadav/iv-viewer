"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("./util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      }); // add listeners

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
      var isTouchEvent = _this.touchMoveEvent === 'touchmove'; // get the coordinates

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

  _createClass(Slider, [{
    key: "removeListeners",
    // remove previous events if its not removed
    // - Case when while sliding mouse moved out of document and released there
    value: function removeListeners() {
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

  return Slider;
}();

var _default = Slider;
exports["default"] = _default;