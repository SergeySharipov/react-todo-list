import logo from './logo.svg';
import './App.css';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import Task from './components/Task';
import uniqid from 'uniqid';
import AddCategory from './components/AddCategory';
import Category from './components/Category';

function App() {
  const TASKS_KEY = "TASK_KEY"
  const CATEGORIES_KEY = "CATEGORIES_KEY"
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])

  /* Load local data */
  useEffect(() => {
    function loadCategoriesFromLocalStorage() {
      const savedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY))
      if (savedCategories !== null) {
        setCategories(savedCategories)
      } else {
        /* Add default categories */
        const defaultCategories = [
          {
            id: 0,
            title: "Daily tasks"
          },
          {
            id: 1,
            title: "Shopping"
          }
        ]
        setCategories(defaultCategories)
      }
    }

    function loadTasksFromLocalStorage() {
      const savedTasks = JSON.parse(localStorage.getItem(TASKS_KEY))
      if (savedTasks !== null) {
        setTasks(savedTasks)
      }
    }

    loadCategoriesFromLocalStorage()
    loadTasksFromLocalStorage()
  }, [])

  /* Save categories to local storage */
  useEffect(() => {
    function saveCategoriesToLocalStorage() {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    }
    if (categories.length !== 0) {
      saveCategoriesToLocalStorage()
    }
  }, [categories])

  /* Save tasks to local storage */
  useEffect(() => {
    function saveTasksToLocalStorage() {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    }
    if (tasks.length !== 0) {
      // TODO Fix: saveTasks called unneccesary once after saved tasks loaded
      saveTasksToLocalStorage()
    }
  }, [tasks])

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  function saveCategory(title) {
    if (!isBlank(title)) {
      setCategories(oldCategories => {
        return [...oldCategories,
        {
          id: uniqid(),
          title: title
        }
        ]
      })
    }
  }

  function saveTask(title, details) {
    if (!isBlank(title)) {
      setTasks(oldTasks => {
        return [...oldTasks,
        {
          id: uniqid(),
          title: title,
          details: details,
          isDone: false
        }
        ]
      })
    }
  }

  function toggleIsDone(taskId) {
    setTasks(oldTasks => {
      return oldTasks.map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
    })
  }

  const categoryElements = categories.map(category => {
    return <Category key={category.id} title={category.title} />
  })

  const taskElements = tasks.map(task => {
    return <Task key={task.id} task={task} toggleIsDone={() => toggleIsDone(task.id)} />
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
        <div class="row">
          <div class="CategoriesColumn">
            <AddCategory saveCategory={saveCategory} />
            {categoryElements}
          </div>
          <div class="TasksColumn">
            <AddTask saveTask={saveTask} />
            {taskElements}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
