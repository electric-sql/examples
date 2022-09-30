// In _document.js
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="sql-wasm-js"
            strategy="beforeInteractive"
            src="/sql-wasm.js" />
      </body>
    </Html>
  )
}
