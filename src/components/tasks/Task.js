import './Task.css';
import ic_edit from "../../images/ic_edit.svg"
import ic_delete from "../../images/ic_delete.svg"

function Task({ task, toggleIsDone, removeTask, openAddUpdateTaskDialog }) {
    return (
        <div className='Task'>
            <input className="Task-checkbox" type="checkbox" checked={task.isDone} onChange={toggleIsDone} />
            <div className="Task-textContent">
                <h3 className='Task-title'>{task.title}</h3>
                <p className='Task-details'>{task.details}</p>
            </div>
            <div className='Task-actions'>
                <button className="Task-editButton" onClick={openAddUpdateTaskDialog}><img src={ic_edit} alt="Edit" /></button>
                <button className="Task-deleteButton" onClick={removeTask}><img src={ic_delete} alt="Delete" /></button>
            </div>
        </div>
    );
}

export default Task;