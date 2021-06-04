import React from 'react'
import NextApp from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'

class App extends NextApp {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    )
  }
}

export default App
