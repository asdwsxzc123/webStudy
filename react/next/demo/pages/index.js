import React from 'react';
import Router from 'next/router';
// import './index.css';

const events = [
  'routerChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStrat',
  'hashChageComplete'
];
function makeEvent(type) {
  return (...args) => {
    console.log(type, args);
  };
}
events.forEach(event => {
  Router.events.on(event, makeEvent(event));
});
const Home = () => (
  <>
    <span>index</span>
  </>
);

export default Home;
