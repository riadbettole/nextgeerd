declare global {
    interface Window {
      gtag?: any;
    }
  }

export const pageview = (url: any) => {
    if (window !== undefined) {
      window.gtag("config", "G-6D3FB43DHN", {
        page_path: url,
      });
    }
  };
  
  export const event = ({ action, params }:{action: any, params: any}) => {
    if (window !== undefined) {
      window.gtag("event", action, params);
    }
  };