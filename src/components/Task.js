function Task({ task, toggleIsDone }) {
    return (
        <div className='Task'>
            <input className="Task-checkbox" type="checkbox" checked={task.isDone} onChange={toggleIsDone} />
            <div className="Task-textContent">
                <h3 className='Task-title'>{task.title}</h3>
                <p className='Task-details'>{task.details}</p>
            </div>
        </div>
    );
}

export default Task;