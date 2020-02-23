import React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/Layout';
import 'antd/dist/antd.css';

class MyApp extends App {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ Component }) {
    console.log('app init');
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps();
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
export default MyApp;
