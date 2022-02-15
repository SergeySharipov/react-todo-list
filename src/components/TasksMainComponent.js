import './TasksMainComponent.css';
import AddTask from './tasks/AddTask';
import { useState, useEffect } from 'react';
import Task from './tasks/Task';
import uniqid from 'uniqid';
import UpdateTaskDialog from './UpdateTaskDialog';

function TasksMainComponent({ selectedCategory }) {
    const TASKS_KEY = "TASK_KEY"
    const [tasks, setTasks] = useState([])
    const [updateTaskId, setUpdateTaskId] = useState("");

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
                    category_id: selectedCategory.id,
                    title: title,
                    details: details,
                    isDone: false
                }
                ]
            })
        }
    }

    function updateTask(task) {
        if (!isBlank(task.title)) {
            setTasks(oldTasks => {
                return oldTasks.map(oldTask => task.id === oldTask.id ? {
                    ...oldTask,
                    category_id: task.categoryId,
                    title: task.title,
                    details: task.details
                } : oldTask)
            })
        }
    }

    function toggleIsDone(taskId) {
        setTasks(oldTasks => {
            return oldTasks.map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
        })
    }

    function removeTask(id) {
        if (!isBlank(id)) {
            setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
        }
    }

    function openUpdateTaskDialog(id) {
        setUpdateTaskId(id);
    }

    function cancelUpdateTaskDialog() {
        if (updateTaskId !== "") {
            setUpdateTaskId("")
        }
    }

    const taskElements = tasks.filter(task => selectedCategory.id === "0" || task.category_id === selectedCategory.id).map(task => {
        return <Task key={task.id} task={task} toggleIsDone={() => toggleIsDone(task.id)} removeTask={() => removeTask(task.id)}
            openUpdateTaskDialog={() => openUpdateTaskDialog(task.id)} />
    })

    return (
        <div className="TasksMainComponent">
            <h1 className='TasksMainComponent-title'>{selectedCategory.title}</h1>
            <AddTask saveTask={saveTask} />
            {taskElements}
            <UpdateTaskDialog
                task={tasks.find(task => task.id === updateTaskId)}
                updateTask={updateTask}
                cancelUpdateTaskDialog={cancelUpdateTaskDialog}
            />
        </div>
    );
}

export default TasksMainComponent;