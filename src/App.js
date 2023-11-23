import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import ItsTime from "./components/ItsTime/ItsTime";
import Finished from "./components/Finished/Finished";
import "./App.css";

const App = () => {
  const getInitialStateTeam = () => {
    const team = localStorage.getItem("List");
    return team ? JSON.parse(team) : [];
  };
  const getInitialStateItsTime = () => {
    const team = localStorage.getItem("ItsTime");
    return team ? JSON.parse(team) : [];
  };
  const getInitialStateFinaly = () => {
    const team = localStorage.getItem("Finaly");
    return team ? JSON.parse(team) : [];
  };

  const [tasks, setTasks] = useState(getInitialStateTeam);
  const [itsTimeTasks, setItsTimeTasks] = useState(getInitialStateItsTime);
  const [finishedTasks, setFinishedTasks] = useState(getInitialStateFinaly);

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const [result, setResult] = useState(false);

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(tasks));
    localStorage.setItem("ItsTime", JSON.stringify(itsTimeTasks));
    localStorage.setItem("Finaly", JSON.stringify(finishedTasks));
  }, [tasks, itsTimeTasks, finishedTasks]);

  const addTask = () => {
    if (newTaskText && newTaskTime) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        time: newTaskTime,
      };

      setTasks([...tasks, newTask]);

      setNewTaskText("");
      setNewTaskTime("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-GB", {
        hour24: true,
        hour: "numeric",
        minute: "numeric",
      });

      const tasksToMove = tasks.filter(
        (task) => task.time === currentTime || task.time < currentTime
      );

      if (tasksToMove.length > 0) {
        setItsTimeTasks((prevItsTimeTasks) =>
          prevItsTimeTasks.concat(
            tasksToMove.map((task) => ({
              ...task,
              countdown: 5, // time in seconds
            }))
          )
        );
        setTasks(tasks.filter((task) => !tasksToMove.includes(task)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  useEffect(() => {
    const itsTimeTimeouts = itsTimeTasks.map((task) =>
      setInterval(() => {
        setItsTimeTasks((prevItsTimeTasks) =>
          prevItsTimeTasks.map((t) =>
            t.id === task.id ? { ...t, countdown: t.countdown - 1 } : t
          )
        );
      }, 1000)
    );

    return () => {
      itsTimeTimeouts.forEach((interval) => {
        clearInterval(interval);
      });
    };
  }, [itsTimeTasks]);

  useEffect(() => {
    const expiredTasks = itsTimeTasks.filter((task) => task.countdown <= 0);

    if (expiredTasks.length > 0) {
      setFinishedTasks((prevFinishedTasks) => [
        ...prevFinishedTasks,
        ...expiredTasks,
      ]);
      setItsTimeTasks((prevItsTimeTasks) =>
        prevItsTimeTasks.filter((t) => !expiredTasks.includes(t))
      );
    }
  }, [itsTimeTasks]);

  return (
    <div className="App">
      <Header
        result={result}
        
        newTaskText={newTaskText}
        newTaskTime={newTaskTime}
        setNewTaskText={setNewTaskText}
        setNewTaskTime={setNewTaskTime}
        addTask={addTask}
      />
      <div className="row">
        <List setTasks={setTasks} tasks={tasks} />
        <ItsTime tasks={itsTimeTasks} />
        <Finished setResult={setResult} tasks={finishedTasks} />
      </div>
    </div>
  );
};

export default App;
