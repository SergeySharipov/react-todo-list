function Task({ task }) {
    return (
        <div className='Task'>
            <h3 className='Task-title'>{task.title}</h3>
            <p className='Task-details'>{task.details}</p>
        </div>
    );
}

export default Task;