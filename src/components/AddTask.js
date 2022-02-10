import { useState } from 'react';

function AddTask(props) {
  const [formData, setFormData] = useState({})

  function handleChange(event) {
    setFormData(oldFormData => {
      return {
        ...oldFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSaveTask(event) {
    event.preventDefault()
    props.saveTask(formData.taskTitle, formData.taskDetails)
  }

  return (
    <form className='AddTaskForm'>
      <input onChange={handleChange} placeholder="Title" className='AddTaskForm-taskTitle' name='taskTitle' />
      <input onChange={handleChange} placeholder="Details" className='AddTaskForm-taskDetails' name='taskDetails' />
      <button className='AddTaskForm-addButton' onClick={handleSaveTask} >Add Task</button>
    </form>
  );
}

export default AddTask;