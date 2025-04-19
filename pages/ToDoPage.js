import React from "react";
import ToDoList from "../components/ToDoList";
import "./ToDoPage.css";

const ToDoPage = () => {
  return (
    <div className="todo-background">
      <div className="todo-container">
        <h2>To-Do List</h2>
        <ToDoList />
      </div>
    </div>
  );
};

export default ToDoPage;
