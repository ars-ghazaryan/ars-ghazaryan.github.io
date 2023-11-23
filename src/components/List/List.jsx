import React, { useRef } from "react";

const List = ({ tasks, setTasks }) => {
  const dragPerson = useRef(0);
  const draggedOverPerson = useRef(0);
  function handleSort() {
    const peopleClone = [...tasks];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[draggedOverPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setTasks(peopleClone);
  }
  return (
    <div>
      <h1 className="taskName">Tasks </h1>
      <div className="list">
        {tasks.length ? (
          tasks.map((task, index) => (
            <h2
              draggable
              onDragStart={() => (dragPerson.current = index)}
              onDragEnter={() => (draggedOverPerson.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className="listTitle"
              key={index}
            >
              {task.text} - {task.time}
            </h2>
          ))
        ) : (
          <h2>There is no task</h2>
        )}
      </div>
    </div>
  );
};

export default List;
