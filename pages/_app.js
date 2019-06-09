import React from 'react';
import App, { Container } from 'next/app';

import "bootstrap/scss/bootstrap.scss"
import "utils/styles.sass"

import { library } from '@fortawesome/fontawesome-svg-core'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import iconsToImport from 'utils/icons-to-import'
iconsToImport.forEach(icon => library.add(solidIcons[icon]))

import moment from 'moment'
moment.locale('es')

import { registerLocale, setDefaultLocale } from  "react-datepicker"
import es from 'date-fns/locale/es'
registerLocale('es', es)
setDefaultLocale('es')



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