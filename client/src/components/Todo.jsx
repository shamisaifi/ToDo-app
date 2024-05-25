import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoList from "./ToDoList";
import { getAccessToken } from "../util";
import { useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";

const Todo = () => {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const Navigate = useNavigate();

  const ACCESS_TOKEN = getAccessToken();

  //funtion to get the todos from server
  const getTodos = async () => {
    try {
      let response = await axios.get("http://localhost:3001/api/get", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      // console.log("response data: ", response.data);
      setTodoList(response.data.todos);
    } catch (error) {
      console.log("error getting doto: ", error);
    }
  };

  //function to save todo  in database
  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (text === "") {
      alert("Please enter a task!");
      return;
    }

    try {
      const savedToDo = await axios.post(
        "http://localhost:3001/api/save",
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTodoList(savedToDo.data.todos);
      setText("");
      getTodos();
    } catch (error) {
      console.error("can not save todo: ", error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/logout");
      if (response.data) {
        Navigate("/login");
      }
    } catch (error) {
      console.log("error while  logging out : ", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100vh", background: "#121314" }}>
        <header>
          <span>
            <FaUserLarge style={{ fontSize: "1.7rem" }} />
          </span>
          <h2>ToDo App</h2>
          <button
            onClick={logout}
            style={{ fontSize: "1rem", fontWeight: "bold" }}
          >
            LogOut
          </button>
        </header>

        <div className="mainContainer">
          <ToDoList
            todoList={todoList}
            setTodoList={setTodoList}
            getTodos={getTodos}
          />

          <form className="form" onSubmit={handleSubmit}>
            <input
              className="todoInput"
              type="text"
              id="text"
              name="text"
              value={text}
              placeholder="add a todo"
              onChange={(e) => setText(e.target.value)}
            />
            <button className="submitButton" type="submit">
              save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Todo;
