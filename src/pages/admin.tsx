// import { Auth, Hub } from 'aws-amplify'; // Assuming you're using AWS Amplify for authentication
// import { Amplify, API, withSSRContext } from "aws-amplify";

import { useEffect, useState } from "react";
import axios from "axios";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsExports from "~/component/aws-exports";

Amplify.configure(awsExports);

const AdminPage = () => {
  const [todos, setTodos] = useState<{ text: string }[]>([]);
  const [todosOrg, setTodosOrg] = useState<{ text: string }[]>([]);
  const [org, setOrg] = useState("");
  const [user, setUser] = useState<any | null>();

  useEffect(() => {
    checkUser();
  }, []);

  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  
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
        if(amplifyUser.signInUserSession.idToken.payload["custom:role"] !== "admin")
          window.location.href = "http://localhost:3000/"
      }
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    try {
      if (user && user.signInUserSession){
      const response = await axios.get(
        "https://registergeerd.hasura.app/api/rest/adminTodo/",
        {
          headers: {
            Authorization:
              "Bearer " + user.signInUserSession.idToken.jwtToken,
          },
        }
      );

      if (response.data.todos) {
        setTodos(response.data.todos);
      }
    }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: any) => {
    try {
      if (user && user.signInUserSession){
      const response = await axios.delete(
        "https://registergeerd.hasura.app/api/rest/deleteTodos/" + id,
        {
          headers: {
            Authorization:
              "Bearer " + user.signInUserSession.idToken.jwtToken,
          },
        }
      );

      if (response.data.delete_todos.affected_rows === 1) {
        const updatedTodos = todos.filter((todo: any) => todo.id !== id);
        setTodos(updatedTodos);
      }
    }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodosOrg = async () => {
    try {
      if (user && user.signInUserSession){
      const response = await axios.get(
        "https://registergeerd.hasura.app/api/rest/adminTodo/"+org,
        {
          headers: {
            Authorization:
              "Bearer " + user.signInUserSession.idToken.jwtToken,
          },
        }
      );
        // console.log(response.data.organisations[0].organisations_users)
      if (response.data.organisations) {
        setTodosOrg(response.data.organisations[0].organisations_users);
        // console.log(todosOrg[0].users_todos)
      }
    }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center  h-screen p-20 gap-y-10">
    <h1 className="text-3xl">ADMIN</h1>
    <div className="flex gap-x-12">
    <table>
    <tbody>
      {todos.map((todo: any, index: number) => (
        // <td className="flex gap-5" key={index}>
        <tr className="w-[100%]" key={todo.id}>
          <td className="border-2 rounded">{todo.userEmail}</td>
          <td className="border-2 rounded">{todo.text}</td>
          <td><button
            className=" bg-red-500 rounded p-1 text-white"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            X
          </button>
          </td>
        </tr>
        // </td>
      ))}
      </tbody>
    </table>
    <div>
      <>
      <label className="font-bold">Organisation : </label>
      <input className="border rounded" value={org} onChange={(e)=>{setOrg(e.target.value)}}/>
      <button className="m-2 px-2 border" onClick={fetchTodosOrg}>?</button>
      </>
    <table>
    <tbody>
      {
      todosOrg.map(
        (todo: any, index: number) => (
        // <td className="flex gap-5" key={index}>
        <div key={index}>
          
          {(todo.users_todos).map((td:any)=>(
          <tr className="w-[100%]" key={td.id}>
            <td className="border-2 rounded">{todo.email}</td>
            <td className="border-2 rounded">{td.text}</td>
            <td>
            <button
            className=" bg-red-500 rounded p-1 text-white"
            onClick={() => handleDeleteTodo(td.id)}>
            X
          </button>
          </td>
            </tr>
          ))}
        </div>
      )
      )
      }
      </tbody>
    </table>
    </div>
    </div>
  </div>
  );
};

// export const getServerSideProps =  (req: any) => {
//   // Retrieve authenticated user's session
//   let user; let role;

//   const SSR = withSSRContext({ req })
//   console.log(req)
// //   Hub.listen("auth",async () => {
// //      user = await Auth.currentAuthenticatedUser();
// //      role = user.attributes["custom:role"]
// //   });

// //   // Extract user's role from the session
// //   console.log(user)
// //   console.log(role)

//   // Perform authorization check based on role
//   if (role !== 'user') {
//     return {
//       redirect: {
//         destination: '/asdas',
//         permanent: false,
//       },
//     };
//   }

//   // Pass additional data to the protected page if needed
//   return {
//     props: {},
//   };
// };

export default AdminPage;
