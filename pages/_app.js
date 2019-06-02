import React from 'react';
import App, { Container } from 'next/app';

import "bootstrap/scss/bootstrap.scss"
import "utils/styles.sass"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faTasks } from '@fortawesome/free-solid-svg-icons'
library.add(faCalendarAlt, faTasks)



class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;