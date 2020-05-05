webpackHotUpdate("static\\development\\pages\\account.js",{

/***/ "./pages/account.jsx":
/*!***************************!*\
  !*** ./pages/account.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.jsx");
var _jsxFileName = "D:\\Programming\\quiz-and-test\\pages\\account.jsx";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function account(props) {
  this.state = {
    count: 0
  };
  this.handleClick = this.handleClick.bind(this);
}

account.prototype.render = function () {
  var count = this.state.count;
  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, __jsx("button", {
    onClick: this.handleClick,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }, "+1"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 7
    }
  }, count));
};

account.prototype.handleClick = function () {
  var count = this.state.count;
  this.setState({
    count: count + 1
  });
};

Object.setPrototypeOf(account.prototype, react__WEBPACK_IMPORTED_MODULE_0___default.a.Component.prototype);
/* harmony default export */ __webpack_exports__["default"] = (account);

/***/ })

})
//# sourceMappingURL=account.js.224f6a4403829c78ff93.hot-update.js.map