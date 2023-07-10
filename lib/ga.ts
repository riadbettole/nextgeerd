// // declare global {
// //     interface Window {
// //       gtag?: any;
// //     }
// //   }

// // export const pageview = (url: any) => {
// //     if (window !== undefined) {
// //       window.gtag("config", "G-6D3FB43DHN", {
// //         page_path: url,
// //       });
// //     }
// //   };
  
// //   export const event = ({ action, params }:{action: any, params: any}) => {
// //     if (window !== undefined) {
// //       window.gtag("event", action, params);
// //     }
// //   };


// export const GA_TRACKING_ID = "G-6D3FB43DHN";

// // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// export const pageview = (url: URL): void => {
//   window.gtag("config", GA_TRACKING_ID, {
//     page_path: url,
//   });
// };

// type GTagEvent = {
//   action: string;
//   category: string;
//   label: string;
//   value: number;
// };

// // https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({ action, category, label, value }: GTagEvent): void => {
//   window.gtag("event", action, {
//     event_category: category,
//     event_label: label,
//     value,
//   });
// };