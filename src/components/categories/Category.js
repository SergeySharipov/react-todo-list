import './Category.css';
import ic_edit from "../../images/ic_edit.svg"
import ic_delete from "../../images/ic_delete.svg"

function Category({ category, selectCategory, editable = true, selectedCategory }) {
  return (
    <div className={selectedCategory.id === category.id ? 'Category-selected' : 'Category'} onClick={selectCategory}>
      <h3 className='Category-title'>{category.title}</h3>
      {editable && <div className='Category-actions'>
        <button className="Category-editButton"><img src={ic_edit} alt="Edit" /></button>
        <button className="Category-deleteButton"><img src={ic_delete} alt="Delete" /></button>
      </div>}
    </div>
  );
}

export default Category;