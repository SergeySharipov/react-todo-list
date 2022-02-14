import '../App.css';
import AddTask from './AddTask';
import { useState, useEffect } from 'react';
import Task from './Task';
import uniqid from 'uniqid';

function TasksMainComponent() {
    const TASKS_KEY = "TASK_KEY"
    const [tasks, setTasks] = useState([])

    /* Load local data */
    useEffect(() => {
        function loadTasksFromLocalStorage() {
            const savedTasks = JSON.parse(localStorage.getItem(TASKS_KEY))
            if (savedTasks !== null) {
                setTasks(savedTasks)
            }
        }

        loadTasksFromLocalStorage()
    }, [])

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

    const taskElements = tasks.map(task => {
        return <Task key={task.id} task={task} toggleIsDone={() => toggleIsDone(task.id)} />
    })

    return (
        <div class="TasksColumn">
            <AddTask saveTask={saveTask} />
            {taskElements}
        </div>
    );
}

export default TasksMainComponent;