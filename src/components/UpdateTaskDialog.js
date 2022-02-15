import './UpdateTaskDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

const UpdateTaskDialog = ({ task, updateTask, cancelUpdateTaskDialog }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })

    useEffect(() => {
        setFormData(task)
    }, [task])

    const handleForm = (e) => {
        console.log(formData)
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isBlank(formData.title)) {
            updateTask(formData)
            cancelUpdateTaskDialog()
        } else {
            alert("Title can not be empty!")
        }
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    return (
        <Modal
            isOpen={task !== undefined}
            contentLabel="Update Task"
            className="UpdateTaskDialog"
            onRequestClose={cancelUpdateTaskDialog}
            overlayClassName="UpdateTaskDialog-overlay">
            <form className='UpdateTaskDialog-form' onSubmit={handleSubmit}>
                <div>
                    <div className='UpdateTaskDialog-column '>
                        <label htmlFor='title'>Title:</label>
                        <input className='AddTaskForm-taskTitle' onChange={handleForm} type='text' id='title' value={formData !== undefined ? formData.title : ""} />
                    </div>
                    <div className='UpdateTaskDialog-column '>
                        <label htmlFor='description'>Details:</label>
                        <input className='AddTaskForm-taskDetails' onChange={handleForm} type='text' id='details' value={formData !== undefined ? formData.details : ""} />
                    </div>
                </div>
                <button className='UpdateTaskDialog-updateButton' disabled={formData === undefined ? true : false} >Update Task</button>
            </form>
        </Modal>
    )
}

export default UpdateTaskDialog