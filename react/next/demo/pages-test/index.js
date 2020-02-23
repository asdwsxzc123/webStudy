import React, { useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
// import './index.css';
const { publicRuntimeConfig } = getConfig();

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
const Home = () => {
  useEffect(() => {
    axios.get('/api/user/info').then(res => console.log(res));
  });
  return (
    <>
      <span>index</span>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
    </>
  );
};

export default Home;
