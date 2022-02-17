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
        const loadTasksFromLocalStorage = () => {
            const savedTasksStr = localStorage.getItem(TASKS_KEY)
            if (savedTasksStr !== null) {
                const savedTasks = JSON.parse(savedTasksStr)
                setTasks(savedTasks)
            }
        };

        loadTasksFromLocalStorage()
    }, [])

    /* Save tasks to local storage */
    useEffect(() => {
        function saveTasksToLocalStorage() {
            localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
        }

        saveTasksToLocalStorage()
    }, [tasks])

    const isBlank = (str: string) => {
        return !str || /^\s*$/.test(str);
    };

    const saveTask = (formData: AddUpdateTaskFormData) => {
        if (!isBlank(formData.title)) {
            setTasks(oldTasks => {
                return [...oldTasks,
                {
                    id: uniqid(),
                    categoryId: formData.category?.value === undefined ? "0" : formData.category?.value,
                    title: formData.title,
                    details: formData.details,
                    isDone: false
                }
                ]
            })
        }
    };

    const updateTask = (task: ITask) => {
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
    };

    const toggleIsDone = (taskId: string) => {
        setTasks(oldTasks => {
            return oldTasks.map(task => task.id === taskId ? { ...task, isDone: !task.isDone } : task)
        })
    };

    const removeTask = (id: string) => {
        if (!isBlank(id)) {
            setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
        }
    };

    const openAddUpdateTaskDialog = (id: string | any) => {
        if (typeof id === 'string') {
            setUpdateTaskId(id);
        }
        setIsOpenAddUpdateTaskDialog(true);
    };

    const cancelAddUpdateTaskDialog = () => {
        if (updateTaskId !== "") {
            setUpdateTaskId("")
        }
        setIsOpenAddUpdateTaskDialog(false);
    };

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
                categories={categories}
                selectedCategoryId={selectedCategoryId}
            />
        </div>
    );
}

export default TasksMainComponent;