import React from "react";

const ItsTime = ({ tasks }) => {
  return (
    <div>
      <h1 className="taskName">It's Time</h1>
      <div className="list">
        {tasks.length ? (
          tasks.map((task, index) => (
            <h2 className="listTitle" key={index}>
              {task.text}
            </h2>
          ))
        ) : (
          <h2>There is no filled time</h2>
        )}
      </div>
    </div>
  );
};

export default ItsTime;
