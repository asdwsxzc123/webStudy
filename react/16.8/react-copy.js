/**
 * react v16.8.6
 * react.development.js
 * umd通用模块规范
 */

'use strict';
//  这一段是为了识别
(function(global, factory) {
  // commonjs规范 nodejs
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'undefined' && define.amd
    ? //amd规范 requirejs
      define(factory)
    : //  普通引用,挂载在全局
      (global.React = factory());
});
