import "../styles/globals.css";
import "../styles/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/layouts/layout";
import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { logout } from "../redux/actions";
import axios from "../utils/axiosInstance";
import OneSignal from "react-onesignal";
import * as fbq from "../lib/fpixel";
import * as gtag from "../lib/gtag";
// import { pageviewGtm } from "../lib/gtm";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { userReducer } = store.getState();

  //Notificaciones push noticias
  useEffect(() => {
    process.env.NODE_ENV === "production" &&
      OneSignal.init({ appId: process.env.NEXT_PUBLIC_ONESIGNAL_ID });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // fb pixel
      fbq.pageviewFpixel();
      // google analytics
      gtag.pageviewGtag(url);
      // google tagmanager
      // pageviewGtm(url);
    };
    const exp = new Date(userReducer.date).getTime() + 7200000;
    const now = new Date(Date.now()).getTime();
    if (now >= exp) {
      handleLogout();
    }

    process.env.NEXT_PUBLIC_PRODUCTION &&
      router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, router]);

  const handleLogout = async () => {
    try {
      const { refreshToken } = userReducer;
      await axios.post("logout", { user_id: userReducer._id, refreshToken });
      if (userReducer.googleUser) {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2 != null) auth2.signOut().then(auth2.disconnect());
      }
      store.dispatch(logout());
      return router.push("/");
    } catch (error) {
      console.log("No se ha podido cerrar sesión: ", error);
    }
  };

  return (
    <>
      {/* //* FB Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '461164115893185');
          fbq('track', 'PageView'); 
          `,
        }}
      />
      <SSRProvider>
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={
              <p
                className="text-center py-4"
                style={{ color: "var(--primary-color)" }}
              >
                Cargando...
              </p>
            }
          />

          <NextNprogress
            color="rgb(129,23,19)"
            startPosition={0.3}
            stopDelayMs={300}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
