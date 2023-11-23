import React from "react";
import { useState } from "react";
const Finished = ({ tasks, setResult }) => {
  const [show, setShow] = useState(false);
  if (show) {
    localStorage.removeItem("Finaly");
  }
  return (
    <div>
      <h1 className="taskName">
        Finished{" "}
        <button
          disabled={false}
          className="btn"
          onClick={() => {
            tasks.length = 0;
            // localStorage.removeItem("Finaly");
            setShow(true);
          }}
        >
          Clear
        </button>
      </h1>

      <div className="list">
        {tasks.length ? (
          tasks.map((task, index) => (
            <div key={index}>
              <h2 className="listTitle">
                {task.text} - {task.time}
              </h2>
              <button
                className="btn"
                onClick={() => {
                  localStorage.setItem(`text`, task.text);
                  localStorage.setItem(`time`, task.time);
                  setTimeout(() => {
                    setResult(false);
                  }, 6000);
                  setResult(true);
                }}
              >
                Save
              </button>
            </div>
          ))
        ) : (
          <h2>Not Finished Task</h2>
        )}
      </div>
    </div>
  );
};

export default Finished;
