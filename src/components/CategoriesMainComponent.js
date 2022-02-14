import '../App.css';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import AddCategory from './AddCategory';
import Category from './Category';

function CategoriesMainComponent() {
    const CATEGORIES_KEY = "CATEGORIES_KEY"
    const [categories, setCategories] = useState([])

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
                        id: 0,
                        title: "Daily tasks"
                    },
                    {
                        id: 1,
                        title: "Shopping"
                    }
                ]
                setCategories(defaultCategories)
            }
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

    const categoryElements = categories.map(category => {
        return <Category key={category.id} title={category.title} />
    })

    return (
        <div class="CategoriesColumn">
            <AddCategory saveCategory={saveCategory} />
            {categoryElements}
        </div>
    );
}

export default CategoriesMainComponent;
