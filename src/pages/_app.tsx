import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import { pageview } from "../../lib/ga";
// import * as gtag from "../../lib/ga";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  //   const router = useRouter();

  //   useEffect(() => {
  // //     const handleRouteChange = (url: URL) => {
  // //       /* invoke analytics function only for production */
  // //        gtag.pageview(url);
  // //     };
  // //     router.events.on("routeChangeComplete", handleRouteChange);
  // //     return () => {
  // //       router.events.off("routeChangeComplete", handleRouteChange);
  // //     };
  // //   }, [router.events]);
  // //   // eslint-disable-next-line react/jsx-props-no-spreading

  return (
    <>
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6D3FB43DHN"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6D3FB43DHN');
    `}
      </Script>
    </>
  );
};
// useEffect(() => {
//   const handleRouteChange = (url: any) => {
//     pageview(url);
//   };

//   //When the component is mounted, subscribe to router changes
//   //and log those page views
//   router.events.on("routeChangeComplete", handleRouteChange);

//   // If the component is unmounted, unsubscribe
//   // from the event with the `off` method
//   return () => {
//     router.events.off("routeChangeComplete", handleRouteChange);
//   };
// }, [router.events]);

export default MyApp;
