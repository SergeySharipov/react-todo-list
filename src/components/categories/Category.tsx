import './Category.css';
import ic_edit from "../../images/ic_edit.svg"
import ic_delete from "../../images/ic_delete.svg"

type Props = {
  category: ICategory
  selectedCategoryId: string
  selectCategory: () => void
  removeCategory: (() => void) | undefined
  openAddUpdateCategoryDialog: (() => void) | undefined
}

const Category: React.FC<Props> = ({ category, selectedCategoryId, selectCategory, removeCategory, openAddUpdateCategoryDialog }) => {

  function handleSelectCategory(e: React.SyntheticEvent) {
    if (e.defaultPrevented) return;
    selectCategory()
  }

  function handleOpenAddUpdateCategoryDialog(e: React.SyntheticEvent) {

    e.preventDefault()
    if (openAddUpdateCategoryDialog) openAddUpdateCategoryDialog()
  }

  function handleRemoveCategory(e: React.SyntheticEvent) {
    e.preventDefault()
    if (removeCategory) removeCategory()
  }

  return (
    <div className={selectedCategoryId === category.id ? 'Category-selected' : 'Category'} onClick={handleSelectCategory}>
      <h3 className='Category-title'>{category.title}</h3>
      {openAddUpdateCategoryDialog !== undefined && <div className='Category-actions'>
        <button className="Category-editButton" onClick={handleOpenAddUpdateCategoryDialog} ><img src={ic_edit} alt="Edit" /></button>
        <button className="Category-deleteButton" onClick={handleRemoveCategory} ><img src={ic_delete} alt="Delete" /></button>
      </div>}
    </div>
  );
}

export default Category;
