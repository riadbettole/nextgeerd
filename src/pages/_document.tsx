// import Document, { Html, Head, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html>
//         <Head>
//           <script
//             async
//             src={`https://www.googletagmanager.com/gtag/js?id=G-6D3FB43DHN`}
//           />
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', 'G-6D3FB43DHN', {
//         page_path: window.location.pathname,
//     });
//     `,
//             }}
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;


import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../../lib/ga";


export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* enable analytics script only for production */}
          {
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}