import { Amplify, Auth, Hub } from 'aws-amplify';
import AppRegister from './appRegister';
import { useEffect, useState } from 'react';
import TodoList from './todo';



function Home() {


  const [user,setUser] = useState<any | null>();

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
        setUser(null);
    }
  }


  return (
    
    <>
      {user ? <TodoList userInfo = {user} /> : <AppRegister />}
      </>
   
  );
}

export default Home;

