import './UpdateCategoryDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

const UpdateCategoryDialog = ({ category, updateCategory, cancelUpdateCategoryDialog }) => {
    const [formData, setFormData] = useState({
        title: ""
    })

    useEffect(() => {
        setFormData(category)
    }, [category])

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
            updateCategory(formData)
            cancelUpdateCategoryDialog()
        } else {
            alert("Title can not be empty!")
        }
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    return (
        <Modal
            isOpen={category !== undefined}
            contentLabel="Update Category"
            className="UpdateCategoryDialog"
            onRequestClose={cancelUpdateCategoryDialog}
            overlayClassName="UpdateCategoryDialog-overlay">
            <form className='UpdateCategoryDialog-form' onSubmit={handleSubmit}>
                <div>
                    <div className='UpdateCategoryDialog-column '>
                        <label htmlFor='title'>Title:</label>
                        <input className='AddCategoryForm-CategoryTitle' onChange={handleForm} type='text' id='title' value={formData !== undefined ? formData.title : ""} />
                    </div>
                </div>
                <button className='UpdateCategoryDialog-updateButton' disabled={formData === undefined ? true : false} >Update Category</button>
            </form>
        </Modal>
    )
}

export default UpdateCategoryDialog