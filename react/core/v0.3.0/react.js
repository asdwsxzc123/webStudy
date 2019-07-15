/**
 * @providesModule React
 */

'use strict';

const ReactDOM = require('./ReactDOM');

class React {
  constructor(option) {
    this.DOM = ReactDOM;
  }
}
console.log('init');
export default React;
