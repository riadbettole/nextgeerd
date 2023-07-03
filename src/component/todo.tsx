import { useState, useEffect } from "react";


import axios from "axios";
import { Auth } from "aws-amplify";

function TodoList({userInfo}:{userInfo:any}) {

  const [todos, setTodos] = useState<{ text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");



  useEffect(() => {
    fetchTodos();
  }, []);

  const logoutDir = async () => {
    await Auth.signOut();
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://registergeerd.hasura.app/api/rest/todos/",
        {
          headers: {
            "Authorization":"Bearer "+userInfo.signInUserSession.idToken.jwtToken
          },
        }
      );

      if (response.data.todos) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue,
      };

      try {
        const response = await axios({
          method: "put",
          url: `https://registergeerd.hasura.app/api/rest/insertTodo/${newTodo.text}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+userInfo.signInUserSession.idToken.jwtToken
          },
          data: {},
        });

        if (response.data.insert_todos.affected_rows === 1) {
          setTodos([...todos, newTodo]);
          setInputValue("");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteTodo = async (id: any) => {
    try {
      const response = await axios.delete(
        "https://registergeerd.hasura.app/api/rest/deleteTodos/" + id,
        {
          headers: {
            "Authorization":"Bearer "+userInfo.signInUserSession.idToken.jwtToken
          },
        }
      );

      if (response.data.delete_todos.affected_rows === 1) {
        const updatedTodos = todos.filter((todo: any) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const todoPageComp = (
    <div className="flex flex-col items-center  h-screen p-20 gap-y-10">
      <h1 className="text-3xl">Todo List</h1>
      <div className="space-x-3">
        <input
          type="text"
          value={inputValue}
          className="border-2"
          onChange={handleInputChange}
        />
        <button className="bg-blue-200 rounded" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li className="flex gap-5" key={todo.id}>
            <p className="border-2 rounded">{todo.text}</p>
            <button
              className=" bg-red-500 rounded p-1 text-white"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
<>
  <button className="m-4 border-2 rounded-lg" onClick={logoutDir}>Logout</button>
    <div className="flex flex-col items-center  h-screen p-20 gap-y-10">
      <h1 className="text-3xl">Todo List</h1>
      <div className="space-x-3">
        <input
          type="text"
          value={inputValue}
          className="border-2"
          onChange={handleInputChange}
        />
        <button className="bg-blue-200 rounded" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li className="flex gap-5" key={todo.id}>
            <p className="border-2 rounded">{todo.text}</p>
            <button
              className=" bg-red-500 rounded p-1 text-white"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default TodoList;
