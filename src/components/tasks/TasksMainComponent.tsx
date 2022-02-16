import './TasksMainComponent.css';
import { useState, useEffect } from 'react';
import Task from './Task';
import uniqid from 'uniqid';
import AddUpdateTaskDialog from './AddUpdateTaskDialog';

type Props = {
    categories: Array<ICategory>
    selectedCategoryId: string
}

const TasksMainComponent: React.FC<Props> = ({
    categories,
    selectedCategoryId
}) => {
    const TASKS_KEY = "TASK_KEY"
    const [tasks, setTasks] = useState<ITask[]>([])
    const [updateTaskId, setUpdateTaskId] = useState<string>("");
    const [isOpenAddUpdateTaskDialog, setIsOpenAddUpdateTaskDialog] = useState<boolean>(false);

    /* Load local data */
    useEffect(() => {
        function loadTasksFromLocalStorage() {
            const savedTasksStr = localStorage.getItem(TASKS_KEY)
            if (savedTasksStr !== null) {
                const savedTasks = JSON.parse(savedTasksStr)
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

    function isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }

    function saveTask(formData: AddUpdateTaskFormData) {
        if (!isBlank(formData.title)) {
            setTasks(oldTasks => {
                return [...oldTasks,
                {
                    id: uniqid(),
                    categoryId: selectedCategoryId,
                    title: formData.title,
                    details: formData.details,
                    isDone: false
                }
                ]
            })
        }
    }

    function updateTask(task: ITask) {
        if (!isBlank(task.title)) {
            setTasks(oldTasks => {
                return oldTasks.map(oldTask => task.id === oldTask.id ? {
                    ...oldTask,
                    categoryId: task.categoryId,
                    title: task.title,
                    details: task.details
                } : oldTask)
            })
        }
    }

    function toggleIsDone(taskId: string) {
        setTasks(oldTasks => {
            return oldTasks.map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
        })
    }

    function removeTask(id: string) {
        if (!isBlank(id)) {
            setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
        }
    }

    function openAddUpdateTaskDialog(id: string | any) {
        if (id === typeof "string") {
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

    const taskElements = tasks.filter(task => selectedCategoryId === "0" || task.categoryId === selectedCategoryId).map(task => {
        return <Task key={task.id} task={task} toggleIsDone={() => toggleIsDone(task.id)} removeTask={() => removeTask(task.id)}
            openAddUpdateTaskDialog={() => openAddUpdateTaskDialog(task.id)} />
    })

    const selectedCategory = categories.find(category => category.id === selectedCategoryId);

    return (
        <div className="TasksMainComponent">
            <h1 className='TasksMainComponent-title'>{selectedCategory === undefined ? "All" : selectedCategory.title}</h1>
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