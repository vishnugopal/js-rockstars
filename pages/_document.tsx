import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";

export default class extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="description" content="Example HN Stories App" />
          <meta
            name="keywords"
            content="hacker news, nextjs, pwa, swr, nodejs"
          />
          <link rel="preconnect" href="https://storage.googleapis.com"></link>
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            href="/favicon-96x96.png"
            rel="icon"
            type="image/png"
            sizes="96x96"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
