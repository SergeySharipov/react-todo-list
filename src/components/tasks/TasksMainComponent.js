import './TasksMainComponent.css';
import { useState, useEffect } from 'react';
import Task from './Task';
import uniqid from 'uniqid';
import AddUpdateTaskDialog from './AddUpdateTaskDialog';

function TasksMainComponent({ categories, selectedCategoryId }) {
    const TASKS_KEY = "TASK_KEY"
    const [tasks, setTasks] = useState([])
    const [updateTaskId, setUpdateTaskId] = useState("");
    const [isOpenAddUpdateTaskDialog, setIsOpenAddUpdateTaskDialog] = useState(false);

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
                    category_id: selectedCategoryId,
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

    function openAddUpdateTaskDialog(id = undefined) {
        if (id !== undefined) {
            setUpdateTaskId(id);
        }
        setIsOpenAddUpdateTaskDialog(true);
    }

    function cancelAddUpdateTaskDialog() {
        if (updateTaskId !== "") {
            setUpdateTaskId("")
        }
        setIsOpenAddUpdateTaskDialog(false);
    }

    const taskElements = tasks.filter(task => selectedCategoryId === "0" || task.category_id === selectedCategoryId).map(task => {
        return <Task key={task.id} task={task} toggleIsDone={() => toggleIsDone(task.id)} removeTask={() => removeTask(task.id)}
            openAddUpdateTaskDialog={() => openAddUpdateTaskDialog(task.id)} />
    })

    const selectedCategory = categories.find(category => category.id === selectedCategoryId);

    return (
        <div className="TasksMainComponent">
            <h1 className='TasksMainComponent-title'>{selectedCategory === undefined ? "" : selectedCategory.title}</h1>
            <div className='TasksMainComponent-container'>
                <button className='TasksMainComponent-addButton' onClick={openAddUpdateTaskDialog} >Add Task</button>
            </div>
            {taskElements}
            <AddUpdateTaskDialog
                isOpenAddUpdateTaskDialog={isOpenAddUpdateTaskDialog}
                task={tasks.find(task => task.id === updateTaskId)}
                saveTask={saveTask}
                updateTask={updateTask}
                cancelAddUpdateTaskDialog={cancelAddUpdateTaskDialog}
            />
        </div>
    );
}

export default TasksMainComponent;