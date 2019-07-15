/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./v0.3.0/react.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./v0.3.0/ReactDOM.js":
/*!****************************!*\
  !*** ./v0.3.0/ReactDOM.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_objMapKeyVal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/objMapKeyVal */ \"./v0.3.0/utils/objMapKeyVal.js\");\n/* harmony import */ var _utils_objMapKeyVal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_objMapKeyVal__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * @providesModule ReactDOM\n * @typechecks\n */\n\n\n\n\n\n/**\n * Creates a new React class that is idempotent and capable of containing other\n * React components. It accepts event listeners and DOM properties that are\n * valid according to `DOMProperty`.\n *\n *  - Event listeners: `onClick`, `onMouseDown`, etc.\n *  - DOM properties: `className`, `name`, `title`, etc.\n *\n * The `style` property functions differently from the DOM API. It accepts an\n * object mapping of style properties to values.\n *\n * @param {string} tag Tag name (e.g. `div`).\n * @param {boolean} omitClose True if the close tag should be omitted.\n * @private\n */\nfunction createDOMComponentClass(tag, omitClose) {\n  var Constructor = function() {};\n\n  Constructor.prototype.constructor = Constructor;\n\n  return function(props, children) {\n    var instance = new Constructor();\n    instance.construct.apply(instance, arguments);\n    return instance;\n  };\n}\n\n/**\n * Creates a mapping from supported HTML tags to `ReactNativeComponent` classes.\n * This is also accessible via `React.DOM`.\n *\n * @public\n */\nvar ReactDOM = _utils_objMapKeyVal__WEBPACK_IMPORTED_MODULE_0___default()(\n  {\n    a: false,\n    abbr: false,\n    address: false,\n    audio: false,\n    b: false,\n    body: false,\n    br: true,\n    button: false,\n    code: false,\n    col: true,\n    colgroup: false,\n    dd: false,\n    div: false,\n    section: false,\n    dl: false,\n    dt: false,\n    em: false,\n    embed: true,\n    fieldset: false,\n    footer: false,\n    // Danger: this gets monkeypatched! See ReactDOMForm for more info.\n    form: false,\n    h1: false,\n    h2: false,\n    h3: false,\n    h4: false,\n    h5: false,\n    h6: false,\n    header: false,\n    hr: true,\n    i: false,\n    iframe: false,\n    img: true,\n    input: true,\n    label: false,\n    legend: false,\n    li: false,\n    line: false,\n    nav: false,\n    object: false,\n    ol: false,\n    optgroup: false,\n    option: false,\n    p: false,\n    param: true,\n    pre: false,\n    select: false,\n    small: false,\n    source: false,\n    span: false,\n    sub: false,\n    sup: false,\n    strong: false,\n    table: false,\n    tbody: false,\n    td: false,\n    textarea: false,\n    tfoot: false,\n    th: false,\n    thead: false,\n    time: false,\n    title: false,\n    tr: false,\n    u: false,\n    ul: false,\n    video: false,\n    wbr: false,\n\n    // SVG\n    circle: false,\n    g: false,\n    path: false,\n    polyline: false,\n    rect: false,\n    svg: false,\n    text: false\n  },\n  createDOMComponentClass\n);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ReactDOM);\n\n\n//# sourceURL=webpack:///./v0.3.0/ReactDOM.js?");

/***/ }),

/***/ "./v0.3.0/react.js":
/*!*************************!*\
  !*** ./v0.3.0/react.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReactDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactDOM */ \"./v0.3.0/ReactDOM.js\");\n/**\n * @providesModule React\n */\n\n\n\n\n\nclass React {\n  constructor(option) {\n    this.DOM = _ReactDOM__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (React);\n\n\n//# sourceURL=webpack:///./v0.3.0/react.js?");

/***/ }),

/***/ "./v0.3.0/utils/objMapKeyVal.js":
/*!**************************************!*\
  !*** ./v0.3.0/utils/objMapKeyVal.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * @providesModule objMapKeyVal\n */\n\n\n\n/**\n * Behaves the same as `objMap` but invokes func with the key first, and value\n * second. Use `objMap` unless you need this special case.\n * Invokes func as:\n *\n *   func(key, value, iteration)\n *\n * @param {?object} obj Object to map keys over\n * @param {!function} func Invoked for each key/val pair.\n * @param {?*} context\n * @return {?object} Result of mapping or null if obj is falsey\n */\nfunction objMapKeyVal(obj, func, context) {\n  if (!obj) {\n    return null;\n  }\n  var i = 0;\n  var ret = {};\n  for (var key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      ret[key] = func.call(context, key, obj[key], i++);\n    }\n  }\n  return ret;\n}\n\nmodule.exports = objMapKeyVal;\n\n\n//# sourceURL=webpack:///./v0.3.0/utils/objMapKeyVal.js?");

/***/ })

/******/ });