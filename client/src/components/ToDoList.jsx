import axios from "axios";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdtadePopup from "./UpdtadePopup";

const ToDoList = ({ todoList, setTodoList, getTodos }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  // delete
  const deleteTodo = async (todo_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/delete/${todo_id}`);
      setTodoList((prev) => {
        const arr = [...prev];
        return arr.filter((item) => item._id !== todo_id);
      });
    } catch (error) {
      console.log("Failed to delete todo ", error);
    }
  };

  const openUpdatePopup = (todo_id) => {
    // console.log(todo_id);
    setShowPopUp(true);
    setSelectedTodoId(todo_id);
  };

  return (
    <>
      <div className="todoListContainer">
        {todoList.length === 0 ? (
          <h4 style={{ textAlign: "center", color: "white" }}>
            List is empty. Add some task
          </h4>
        ) : (
          todoList.map((item) => (
            <div key={item._id} className="todoList">
              <div>{item.text}</div>
              <div>
                <FaEdit
                  className="Edit"
                  onClick={() => openUpdatePopup(item._id)}
                />
                <MdDelete
                  className="Delete"
                  onClick={() => deleteTodo(item._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {showPopUp && (
        <UpdtadePopup
          todoList={todoList}
          setTodoList={setTodoList}
          todoId={selectedTodoId}
          getTodos={getTodos}
          setShowPopUp={setShowPopUp}
        />
      )}
    </>
  );
};

export default ToDoList;
