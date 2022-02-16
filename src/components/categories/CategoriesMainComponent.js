import './CategoriesMainComponent.css';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import AddCategory from './AddCategory';
import Category from './Category';
import UpdateCategoryDialog from './UpdateCategoryDialog';


function CategoriesMainComponent({ categories, setCategories, setSelectedCategoryId, selectedCategoryId }) {
    const [updateCategoryId, setUpdateCategoryId] = useState("");
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

    function openUpdateCategoryDialog(id) {
        setUpdateCategoryId(id);
    }

    function cancelUpdateCategoryDialog() {
        if (updateCategoryId !== "") {
            setUpdateCategoryId("")
        }
    }

    const categoryElements = categories.map(category => {
        return <Category
            key={category.id}
            category={category}
            selectedCategoryId={selectedCategoryId}
            selectCategory={() => selectCategory(category)}
            removeCategory={() => removeCategory(category.id)}
            openUpdateCategoryDialog={() => openUpdateCategoryDialog(category.id)} />
    })

    return (
        <div className="CategoriesMainComponent">
            <AddCategory saveCategory={saveCategory} />
            {categoryElements}
            <UpdateCategoryDialog
                category={categories.find(task => task.id === updateCategoryId)}
                updateCategory={updateCategory}
                cancelUpdateCategoryDialog={cancelUpdateCategoryDialog}
            />
        </div>
    );
}

export default CategoriesMainComponent;