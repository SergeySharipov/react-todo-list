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

const categoryOptionAll = {
    value: "0",
    label: "All"
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
        category: categoryOptionAll
    })
    const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string; }[]>([categoryOptionAll])

    useEffect(() => {
        let categoriesPrep = categories.map(category => ({
            value: category.id,
            label: category.title
        }))

        setCategoryOptions([categoryOptionAll, ...categoriesPrep])
    }, [categories])

    useEffect(() => {
        if (isOpenAddUpdateTaskDialog) {
            setFormData(() => {
                let selectedCategoryOption;
                if (task !== undefined && !isBlank(task.categoryId)) {
                    selectedCategoryOption = categoryOptions.find(category => category.value === task.categoryId)
                } else {
                    selectedCategoryOption = categoryOptions.find(category => category.value === selectedCategoryId)
                }
                return {
                    title: task === undefined ? "" : task.title,
                    details: task === undefined ? "" : task.details,
                    category: selectedCategoryOption === undefined ? categoryOptionAll : selectedCategoryOption
                }
            })
        }
    }, [isOpenAddUpdateTaskDialog, task, categoryOptions, selectedCategoryId])

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
            category: categoryOptionAll
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
                    <Select options={categoryOptions} defaultValue={formData.category}
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