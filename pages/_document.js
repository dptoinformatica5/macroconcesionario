import Document, { Head, Html, Main, NextScript } from "next/document";
import Image from "next/image";
import { FB_PIXEL_ID } from "../lib/fpixel";
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        {process.env.NEXT_PUBLIC_PRODUCTION ? (
          <Head>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                  cookie_flags: 'max-age=7200;secure;samesite=none'
                });`,
              }}
            />
            {/* //*FB Pixel image */}
            <noscript>
              <Image
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </Head>
        ) : (
          <Head />
        )}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
