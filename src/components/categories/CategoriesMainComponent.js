import './CategoriesMainComponent.css';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Category from './Category';
import AddUpdateCategoryDialog from './AddUpdateCategoryDialog';

function CategoriesMainComponent({ categories, setCategories, setSelectedCategoryId, selectedCategoryId }) {
    const [updateCategoryId, setUpdateCategoryId] = useState("");
    const [isOpenAddUpdateCategoryDialog, setIsOpenAddUpdateCategoryDialog] = useState(false);
    const CATEGORIES_KEY = "CATEGORIES_KEY"
    const defaultCategories = [
        {
            id: "0",
            title: "All",
            notEditable: true
        },
        {
            id: "1",
            title: "Daily tasks"
        },
        {
            id: "2",
            title: "Shopping"
        }
    ]

    /* Load local data */
    useEffect(() => {
        function loadCategoriesFromLocalStorage() {
            const savedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY))
            if (savedCategories !== null) {
                setCategories(savedCategories)
            } else {
                /* Add default categories */
                setCategories(defaultCategories)
            }
            selectCategory(defaultCategories[0])
        }

        loadCategoriesFromLocalStorage()
    }, [])

    /* Save categories to local storage */
    useEffect(() => {
        function saveCategoriesToLocalStorage() {
            localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
        }
        if (categories.length !== 0) {
            saveCategoriesToLocalStorage()
        }
    }, [categories])

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    function saveCategory(title) {
        if (!isBlank(title)) {
            setCategories(oldCategories => {
                return [...oldCategories,
                {
                    id: uniqid(),
                    title: title
                }
                ]
            })
        }
    }

    function updateCategory(category) {
        if (!isBlank(category.title)) {
            setCategories(oldCategories => {
                return oldCategories.map(oldCategory => category.id === oldCategory.id ? {
                    ...oldCategory,
                    title: category.title
                } : oldCategory)
            })
        }
    }

    function removeCategory(id) {
        if (!isBlank(id)) {
            setCategories(oldCategories => oldCategories.filter(category => category.id !== id))
            if (selectedCategoryId === id) {
                selectCategory(defaultCategories[0])
            }
        }
    }

    function selectCategory(category) {
        setSelectedCategoryId(category.id)
    }

    function openAddUpdateCategoryDialog(id = undefined) {
        if (id !== undefined) {
            setUpdateCategoryId(id);
        }
        setIsOpenAddUpdateCategoryDialog(true);
    }

    function cancelAddUpdateCategoryDialog() {
        if (updateCategoryId !== "") {
            setUpdateCategoryId("")
        }
        setIsOpenAddUpdateCategoryDialog(false);
    }

    const categoryElements = categories.map(category => {
        return <Category
            key={category.id}
            category={category}
            selectedCategoryId={selectedCategoryId}
            selectCategory={() => selectCategory(category)}
            removeCategory={() => removeCategory(category.id)}
            openAddUpdateCategoryDialog={() => openAddUpdateCategoryDialog(category.id)} />
    })

    return (
        <div className="CategoriesMainComponent">
            <div className='CategoriesMainComponent-container'>
                <button className='CategoriesMainComponent-addButton' onClick={openAddUpdateCategoryDialog} >Add Category</button>
            </div>
            {categoryElements}
            <AddUpdateCategoryDialog
                isOpenAddUpdateCategoryDialog={isOpenAddUpdateCategoryDialog}
                category={categories.find(task => task.id === updateCategoryId)}
                saveCategory={saveCategory}
                updateCategory={updateCategory}
                cancelAddUpdateCategoryDialog={cancelAddUpdateCategoryDialog}
            />
        </div>
    );
}

export default CategoriesMainComponent;