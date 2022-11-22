import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

// <link
//   href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
//   rel="stylesheet"
// />
export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='ja'>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}