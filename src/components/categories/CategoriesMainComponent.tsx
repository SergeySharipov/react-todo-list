import './CategoriesMainComponent.css';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Category from './Category';
import AddUpdateCategoryDialog from './AddUpdateCategoryDialog';

type Props = {
    categories: ICategory[]
    setCategories: (React.Dispatch<React.SetStateAction<ICategory[]>>)
    setSelectedCategoryId: (id: string) => void
    selectedCategoryId: string
}

const CategoriesMainComponent: React.FC<Props> = ({ categories, setCategories, setSelectedCategoryId, selectedCategoryId }) => {
    const showAllCategory = {
        id: "0",
        title: "All"
    };
    const [updateCategoryId, setUpdateCategoryId] = useState("");
    const [isOpenAddUpdateCategoryDialog, setIsOpenAddUpdateCategoryDialog] = useState(false);
    const CATEGORIES_KEY = "CATEGORIES_KEY"

    /* Load local data */
    useEffect(() => {
        const defaultCategories = [
            {
                id: "1",
                title: "Daily tasks"
            },
            {
                id: "2",
                title: "Shopping"
            }
        ]
        function loadCategoriesFromLocalStorage() {
            const savedCategoriesStr = localStorage.getItem(CATEGORIES_KEY)
            if (savedCategoriesStr !== null) {
                const savedCategories = JSON.parse(savedCategoriesStr)
                setCategories(savedCategories)
            } else {
                /* Add default categories */
                setCategories(defaultCategories)
            }
        }
        loadCategoriesFromLocalStorage()
    }, [setCategories])

    /* Save categories to local storage */
    useEffect(() => {
        function saveCategoriesToLocalStorage() {
            localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
        }

        saveCategoriesToLocalStorage()
    }, [categories])

    const isBlank = (str: string) => {
        return !str || /^\s*$/.test(str);
    };

    const saveCategory = (formData: AddUpdateCategoryFormData) => {
        if (!isBlank(formData.title)) {
            setCategories(oldCategories => {
                return [...oldCategories,
                {
                    id: uniqid(),
                    title: formData.title
                }
                ]
            })
        }
    };

    const updateCategory = (category: ICategory) => {
        if (!isBlank(category.title)) {
            setCategories(oldCategories => {
                return oldCategories.map(oldCategory => category.id === oldCategory.id ? {
                    ...oldCategory,
                    title: category.title
                } : oldCategory)
            })
        }
    };

    const removeCategory = (id: string) => {
        if (!isBlank(id)) {
            setCategories(oldCategories => oldCategories.filter(category => category.id !== id))
            if (selectedCategoryId === id) {
                selectCategory(showAllCategory.id)
            }
        }
    };

    const selectCategory = (id: string) => {
        setSelectedCategoryId(id)
    };

    const openAddUpdateCategoryDialog = (id: string | any) => {
        if (typeof id === "string") {
            setUpdateCategoryId(id);
        }
        setIsOpenAddUpdateCategoryDialog(true);
    };

    const cancelAddUpdateCategoryDialog = () => {
        if (updateCategoryId !== "") {
            setUpdateCategoryId("")
        }
        setIsOpenAddUpdateCategoryDialog(false);
    };

    const categoryElements = categories.map(category => {
        return <Category
            key={category.id}
            category={category}
            selectedCategoryId={selectedCategoryId}
            selectCategory={() => selectCategory(category.id)}
            removeCategory={() => removeCategory(category.id)}
            openAddUpdateCategoryDialog={() => openAddUpdateCategoryDialog(category.id)} />
    })

    return (
        <div className="CategoriesMainComponent">
            <div className='CategoriesMainComponent-container'>
                <button className='CategoriesMainComponent-addButton' onClick={openAddUpdateCategoryDialog} >Add Category</button>
            </div>
            <Category
                category={showAllCategory}
                selectedCategoryId={selectedCategoryId}
                selectCategory={() => selectCategory(showAllCategory.id)}
                removeCategory={undefined}
                openAddUpdateCategoryDialog={undefined} />
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