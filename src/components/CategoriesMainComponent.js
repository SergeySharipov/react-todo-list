import './CategoriesMainComponent.css';
import { useEffect } from 'react';
import uniqid from 'uniqid';
import AddCategory from './categories/AddCategory';
import Category from './categories/Category';


function CategoriesMainComponent({ categories, setCategories, setSelectedCategoryId, selectedCategoryId }) {
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
            selectCategory(defaultCategories[0].id)
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

    function removeCategory(id) {
        if (!isBlank(id)) {
            if (selectedCategoryId === id) {
                selectCategory(defaultCategories[0].id)
            }
            setCategories(oldCategories => oldCategories.filter(category => category.id !== id))
        }
    }

    function selectCategory(id) {
        setSelectedCategoryId(id)
    }

    const categoryElements = categories.map(category => {
        return <Category key={category.id} category={category} selectedCategoryId={selectedCategoryId}
            selectCategory={() => selectCategory(category.id)} removeCategory={() => removeCategory(category.id)} />
    })

    return (
        <div className="CategoriesMainComponent">
            <AddCategory saveCategory={saveCategory} />
            {categoryElements}
        </div>
    );
}

export default CategoriesMainComponent;