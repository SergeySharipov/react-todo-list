import './AddUpdateTaskDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";
import Select, { SingleValue } from 'react-select'

Modal.setAppElement("#root");

type Props = {
    task: ITask | undefined
    isOpenAddUpdateTaskDialog: boolean
    saveTask: (formData: AddUpdateTaskFormData) => void
    updateTask: (task: ITask) => void
    cancelAddUpdateTaskDialog: () => void
    categories: Array<ICategory>
    selectedCategoryId: string
}

const AddUpdateTaskDialog: React.FC<Props> = ({
    task,
    isOpenAddUpdateTaskDialog,
    saveTask,
    updateTask,
    cancelAddUpdateTaskDialog,
    categories,
    selectedCategoryId
}) => {
    const [formData, setFormData] = useState<AddUpdateTaskFormData>({
        title: "",
        details: "",
        category: {
            value: "0",
            label: "All"
        }
    })
    const [selectCategories, setSelectCategories] = useState<{ value: string; label: string; }[]>([{
        value: "0",
        label: "All"
    }])

    useEffect(() => {
        if (selectCategories.length === 1 && categories.length !== 0) {
            let categoriesPrep = categories.map(category => ({
                value: category.id,
                label: category.title
            }))

            setSelectCategories(old => [...old, ...categoriesPrep])
        }
    }, [selectCategories, setSelectCategories, categories])

    useEffect(() => {
        if (isOpenAddUpdateTaskDialog) {
            setFormData(() => {
                let selectedCategory;
                console.log(task)
                if (task !== undefined && !isBlank(task.categoryId)) {
                    selectedCategory = categories.find(option => option.id === task.categoryId)
                } else {
                    selectedCategory = categories.find(option => option.id === selectedCategoryId)
                }
                return {
                    title: task === undefined ? "" : task.title,
                    details: task === undefined ? "" : task.details,
                    category: {
                        value: selectedCategory === undefined ? "0" : selectedCategory.id,
                        label: selectedCategory === undefined ? "All" : selectedCategory.title
                    }
                }
            })
        }
    }, [isOpenAddUpdateTaskDialog, task, categories, selectedCategoryId])

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (name !== null && value !== null) {
            setFormData(old => ({
                ...old,
                [name]: value,
            }))
        }
    }

    const handleSelectChange = (newValue: SingleValue<{
        value: string;
        label: string;
    }>) => {
        if (newValue) {
            setFormData(old => ({
                ...old,
                category: newValue,
            }))
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!isBlank(formData.title)) {
            if (task === undefined) {
                saveTask(formData)
            } else {
                updateTask({
                    ...task,
                    title: formData.title,
                    details: formData.details
                })
            }
            handleCancelAddUpdateTaskDialog()
        } else {
            alert("Title can not be empty!")
        }
    }

    const handleCancelAddUpdateTaskDialog = () => {
        setFormData({
            title: "",
            details: "",
            category: {
                value: "0",
                label: "All"
            }
        })
        cancelAddUpdateTaskDialog()
    };

    const isBlank = (str: string) => {
        return !str || /^\s*$/.test(str);
    };

    const label = task === undefined ? "Add Task" : "Update Task";

    return (
        <Modal
            isOpen={isOpenAddUpdateTaskDialog}
            contentLabel={label}
            className="AddUpdateTaskDialog"
            onRequestClose={handleCancelAddUpdateTaskDialog}
            overlayClassName="AddUpdateTaskDialog-overlay">
            <form className='AddUpdateTaskDialog-form' onSubmit={handleSubmit}>
                <div>
                    <Select options={selectCategories} defaultValue={formData.category}
                        onChange={handleSelectChange} name="category" />
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='title'>Title:</label>
                        <input className='AddUpdateTaskDialog-taskTitle' onChange={handleForm} type='text' name='title' value={formData.title} />
                    </div>
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='details'>Details:</label>
                        <input className='AddUpdateTaskDialog-taskDetails' onChange={handleForm} type='text' name='details' value={formData.details} />
                    </div>
                </div>
                <button className='AddUpdateTaskDialog-updateButton'  >{label}</button>
            </form>
        </Modal>
    )
}

export default AddUpdateTaskDialog