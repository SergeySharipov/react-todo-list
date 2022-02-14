import './AddCategory.css';

function AddCategory({ saveCategory }) {

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    function handleCreateNewList() {
        let title = prompt("Please enter new list title:");
        if (isBlank(title)) {
            alert("Title can not be blank.");
        } else {
            saveCategory(title)
        }
    }

    return (
        <div className='AddCategory'>
            <button className='AddCategory-addButton' onClick={handleCreateNewList} >Create new list</button>
        </div>
    );
}

export default AddCategory;