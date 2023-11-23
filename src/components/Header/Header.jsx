import React from "react";
import styles from "./Header.module.css";

const Header = ({
  newTaskText,
  newTaskTime,
  setNewTaskText,
  setNewTaskTime,
  addTask,
  result,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Task text"
        value={result ? localStorage.getItem("text") : newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        className={styles.text}
      />
      <input
        type="time"
        value={result ? localStorage.getItem("time") : newTaskTime}
        onChange={(e) => setNewTaskTime(e.target.value)}
        className={styles.time}
      />

      <button
        disabled={result}
        onClick={() => {
          addTask();
          // localStorage.setItem(`text`, newTaskText);
          // localStorage.setItem(`time`, newTaskTime);
        }}
        className={styles.btn}
      >
        Add
      </button>
    </div>
  );
};
export default Header;
