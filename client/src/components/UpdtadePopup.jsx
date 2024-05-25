import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";

const UpdtadePopup = ({
  todoList,
  setTodoList,
  todoId,
  getTodos,
  setShowPopUp,
}) => {
  const [text, setText] = useState("");

  // Function to handle todo update
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    try {
      const updatedTodo = await axios.post(
        `http://localhost:3001/api/update/${todoId}`,
        {
          text,
        }
      );
      // Update todoList with the updated todo
      const updatedList = todoList.map((todo) => {
        if (todo._id === todoId) {
          return { ...todo, text: updatedTodo.data.text };
        }

        return todo;
      });

      setTodoList(updatedList);
      setShowPopUp(false);
      getTodos();
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  return (
    <div className="update_model">
      <form className="update_form" onSubmit={handleUpdate}>
        <input
          className="todoInput"
          type="text"
          id="text"
          name="text"
          value={text}
          placeholder="Update todo"
          onChange={(e) => setText(e.target.value)}
          style={{ color: "white" }}
        />
        <button className="submitButton" type="submit">
          Update
        </button>
        <GrClose
          onClick={() => setShowPopUp(false)}
          style={{
            color: "white",
            fontSize: "2rem",
            paddingLeft: "10px",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
};

export default UpdtadePopup;
