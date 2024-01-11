import { useEffect, useState } from "react";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  useEffect(() => {
    let intervalId;
    if (isRun) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [time, isRun]);

  let hour = Math.floor(time / 360000);
  let minute = Math.floor((time % 360000) / 6000);
  let second = Math.floor((time % 6000) / 100);
  let miliSecond = Math.floor(time % 100);

  const handleRun = () => {
    setIsRun(!isRun);
  };
  const saveTask = () => {
    if (activeTask) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), name: activeTask, time: time },
      ]);
      setActiveTask("");
      setIsRun(false);
      setTime(0);
    }
    if (isEdit) {
      setTasks(
        tasks.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: activeTask };
          }
          return elem;
        })
      );
    }
  };
  const editTask = (id) => {
    const editItem = tasks.find((elem) => {
      return elem.id === id;
    });
    setActiveTask(editItem.name);
    setIsEdit(id);
  };
  return (
    <div>
      <h1>Time - Tracking App</h1>
      <div className="clock-area">
        <h2>
          {hour.toString().padStart(2, 0)} : {minute.toString().padStart(2, 0)}{" "}
          :{second.toString().padStart(2, 0)} :
          {miliSecond.toString().padStart(2, 0)}
        </h2>
        <button onClick={handleRun} className={isRun ? "run" : "stop"}>
          {isRun ? "Stop" : "Start"}
        </button>
        <button onClick={() => setTime(0)} disabled={time === 0}>
          Reset
        </button>
        <button onClick={saveTask} disabled={activeTask === ""}>
          Save Task
        </button>
      </div>
      {/* task Area*/}
      <div>
        <h2>Enter Your Tasks -</h2>
        <form>
          <input
            type="text"
            name="taskName"
            placeholder="Your Task"
            value={activeTask}
            onChange={(e) => setActiveTask(e.target.value)}
          />
        </form>
        <div className="task-area">
          <ol>
            {tasks.map((task) => (
              <>
                <li key={task.id}>{`Task : ${task.name}`}</li>
                <p className="styleTime">Time : {task.time / 100} Second</p>
                <button onClick={() => editTask(task.id)}>Edit </button>
              </>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default App;
