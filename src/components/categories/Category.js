import './Category.css';
import ic_edit from "../../images/ic_edit.svg"
import ic_delete from "../../images/ic_delete.svg"

function Category({ title, editable = true }) {
  return (
    <div className='Category'>
      <h3 className='Category-title'>{title}</h3>
      {editable && <div className='Category-actions'>
        <button className="Category-editButton"><img src={ic_edit} alt="Edit" /></button>
        <button className="Category-deleteButton"><img src={ic_delete} alt="Delete" /></button>
      </div>}
    </div>
  );
}

export default Category;