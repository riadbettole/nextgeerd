import { Auth, Hub } from "aws-amplify";
import AppRegister from "../component/appRegister";
import { useEffect, useState } from "react";
import TodoList from "../component/todo";
import Head from "next/head";

function Home() {
  const [user, setUser] = useState<any | null>();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }

  return (
    <>
      <Head>
        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6D3FB43DHN"/>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6D3FB43DHN');`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "hx346mghtw");
          `,
          }}
        />
      </Head>
      {user ? <TodoList userInfo={user} /> : <AppRegister />}
    </>
  );
}

export default Home;
