import logo from './logo.svg';
import './App.css';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import Task from './components/Task';
import uniqid from 'uniqid';

function App() {
  const TASKS_KEY = "TASK_KEY"
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem(TASKS_KEY))
      if (savedTasks !== null) {
        setTasks(savedTasks)
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    function saveTasks() {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    }
    if (tasks.length !== 0) {
      // TODO Fix: saveTasks called unneccesary once after saved tasks loaded
      saveTasks()
    }
  }, [tasks])

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  function saveTask(title, details) {
    if (!isBlank(title)) {
      setTasks(oldTasks => {
        return [...oldTasks,
        {
          id: uniqid(),
          title: title,
          details: details
        }
        ]
      })
    }
  }

  const taskElements = tasks.map(task => {
    return <Task key={task.id} task={task} />
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ToDo List
        </p>
      </header>
      <main>
        <AddTask saveTask={saveTask} />
        {taskElements}
      </main>
    </div>
  );
}

export default App;
