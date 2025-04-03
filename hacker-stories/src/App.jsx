import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Lab 11", completed: false },
    { id: 2, text: "Review JSX Events and State", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObject = {
      id: tasks.length + 1,
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.text}
            <button onClick={() => toggleTaskCompletion(task.id)}>X</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;













