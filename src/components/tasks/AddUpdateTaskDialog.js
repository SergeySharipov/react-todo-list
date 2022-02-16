import './AddUpdateTaskDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddUpdateTaskDialog = ({ isOpenAddUpdateTaskDialog, task, saveTask, updateTask, cancelAddUpdateTaskDialog }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {
        setFormData(task)
    }, [task])

    const handleForm = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isBlank(formData.title)) {
            if (task === undefined) {
                saveTask(formData.title, formData.details)
            } else {
                updateTask(formData)
            }
            cancelAddUpdateTaskDialog()
        } else {
            alert("Title can not be empty!")
        }
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    const label = task === undefined ? "Add Task" : "Update Task";

    return (
        <Modal
            isOpen={isOpenAddUpdateTaskDialog}
            contentLabel={label}
            className="AddUpdateTaskDialog"
            onRequestClose={cancelAddUpdateTaskDialog}
            overlayClassName="AddUpdateTaskDialog-overlay">
            <form className='AddUpdateTaskDialog-form' onSubmit={handleSubmit}>
                <div>
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='title'>Title:</label>
                        <input className='AddUpdateTaskDialog-taskTitle' onChange={handleForm} type='text' id='title' value={formData !== undefined ? formData.title : ""} />
                    </div>
                    <div className='AddUpdateTaskDialog-column '>
                        <label htmlFor='description'>Details:</label>
                        <input className='AddUpdateTaskDialog-taskDetails' onChange={handleForm} type='text' id='details' value={formData !== undefined ? formData.details : ""} />
                    </div>
                </div>
                <button className='AddUpdateTaskDialog-updateButton'  >{label}</button>
            </form>
        </Modal>
    )
}

export default AddUpdateTaskDialog