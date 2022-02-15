import './CategoriesMainComponent.css';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import AddCategory from './categories/AddCategory';
import Category from './categories/Category';


function CategoriesMainComponent({ selectCategory,  selectedCategory }) {
    const CATEGORIES_KEY = "CATEGORIES_KEY"
    const [categories, setCategories] = useState([])
    const permanentCategories = [
        {
            id: "0",
            title: "All"
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
                const defaultCategories = [
                    {
                        id: "100",
                        title: "Daily tasks"
                    },
                    {
                        id: "101",
                        title: "Shopping"
                    }
                ]
                setCategories(defaultCategories)
            }
            selectCategory(permanentCategories[0])
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

    const permanentCategoryElements = permanentCategories.map(category => {
        return <Category key={category.id} category={category} selectedCategory={selectedCategory}
         selectCategory={() => selectCategory(category)} editable={false} />
    })
    const categoryElements = categories.map(category => {
        return <Category key={category.id} category={category} selectedCategory={selectedCategory}
         selectCategory={() => selectCategory(category)} />
    })

    return (
        <div className="CategoriesMainComponent">
            <AddCategory saveCategory={saveCategory} />
                {permanentCategoryElements}
                {categoryElements}
        </div>
    );
}

export default CategoriesMainComponent;

