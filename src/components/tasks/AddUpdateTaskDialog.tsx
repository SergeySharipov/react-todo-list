import './AddUpdateTaskDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
    task: ITask | undefined
    isOpenAddUpdateTaskDialog: boolean
    saveTask: (formData: AddUpdateTaskFormData) => void
    updateTask: (task: ITask) => void
    cancelAddUpdateTaskDialog: () => void
}

const AddUpdateTaskDialog: React.FC<Props> = ({ 
    task,
    isOpenAddUpdateTaskDialog,
    saveTask,
    updateTask,
    cancelAddUpdateTaskDialog
 }) => {
    const [formData, setFormData] = useState<AddUpdateTaskFormData>({
        title: "",
        details: ""
    })

    useEffect(() => {
        if (task !== undefined) {
            setFormData({
                title: task.title,
                details: task?.details
            })
        }
    }, [task])

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
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

    function handleCancelAddUpdateTaskDialog() {
        setFormData({
            title: "",
            details: ""
        })
        cancelAddUpdateTaskDialog()
    }


    function isBlank(str: string) {
        return (!str || /^\s*$/.test(str));
    }

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
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='title'>Title:</label>
                        <input className='AddUpdateTaskDialog-taskTitle' onChange={handleForm} type='text' id='title' value={formData.title} />
                    </div>
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='details'>Details:</label>
                        <input className='AddUpdateTaskDialog-taskDetails' onChange={handleForm} type='text' id='details' value={formData.details} />
                    </div>
                </div>
                <button className='AddUpdateTaskDialog-updateButton'  >{label}</button>
            </form>
        </Modal>
    )
}

export default AddUpdateTaskDialog