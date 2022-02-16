import './AddUpdateCategoryDialog.css';
import React, { useState, useEffect } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

type Props = {
    category: ICategory | undefined
    isOpenAddUpdateCategoryDialog: boolean
    saveCategory: (formData: AddUpdateCategoryFormData) => void
    updateCategory: (task: ICategory) => void
    cancelAddUpdateCategoryDialog: () => void
}

const AddUpdateCategoryDialog: React.FC<Props>
    = ({ category, isOpenAddUpdateCategoryDialog, saveCategory, updateCategory, cancelAddUpdateCategoryDialog }) => {
        const [formData, setFormData] = useState({
            title: ""
        })

        useEffect(() => {
            if (category !== undefined) {
                setFormData(category)
            }
        }, [category])

        const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.currentTarget.id]: e.currentTarget.value,
            })
        }

        const handleSubmit = (e: React.SyntheticEvent) => {
            e.preventDefault()
            if (!isBlank(formData.title)) {
                if (category === undefined) {
                    saveCategory(formData)
                } else {
                    updateCategory({
                        ...category,
                        title: formData.title
                    })
                }
                handleCancelAddUpdateCategoryDialog()
            } else {
                alert("Title can not be empty!")
            }
        }

        function handleCancelAddUpdateCategoryDialog() {
            setFormData({
                title: ""
            })
            cancelAddUpdateCategoryDialog()
        }

        function isBlank(str: string) {
            return (!str || /^\s*$/.test(str));
        }

        const label = category === undefined ? "Add Category" : "Update Category";

        return (
            <Modal
                isOpen={isOpenAddUpdateCategoryDialog}
                contentLabel={label}
                className="AddUpdateCategoryDialog"
                onRequestClose={handleCancelAddUpdateCategoryDialog}
                overlayClassName="AddUpdateCategoryDialog-overlay">
                <form className='AddUpdateCategoryDialog-form' onSubmit={handleSubmit}>
                    <div>
                        <div className='AddUpdateCategoryDialog-column '>
                            <label htmlFor='title'>Title:</label>
                            <input className='AddUpdateCategoryDialog-categoryTitle' onChange={handleForm} type='text' id='title' value={formData !== undefined ? formData.title : ""} />
                        </div>
                    </div>
                    <button className='AddUpdateCategoryDialog-updateButton'>{label}</button>
                </form>
            </Modal>
        )
    }

export default AddUpdateCategoryDialog