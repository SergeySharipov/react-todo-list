import './AddTask.css';
import { useState } from 'react';

function AddTask(props) {
  const [formData, setFormData] = useState({})

  function handleChange(event) {
    setFormData(oldFormData => {
      return {
        ...oldFormData,
        [event.target.id]: event.target.value
      }
    })
  }

  function handleSaveTask(event) {
    event.preventDefault()
    if (!isBlank(formData.taskTitle)) {
      props.saveTask(formData.taskTitle, formData.taskDetails)
      setFormData({
        taskTitle: "",
        taskDetails: ""
      })
    } else {
      alert("The title field can not be empty!")
    }
  }

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  return (
    <form className='AddTaskForm'>
      <div className='AddTaskForm-column'>
        <input onChange={handleChange} value={formData.taskTitle} placeholder="Title" className='AddTaskForm-taskTitle' id='taskTitle' />
      </div>
      <div className='AddTaskForm-column'>
        <input onChange={handleChange} value={formData.taskDetails} placeholder="Details" className='AddTaskForm-taskDetails' id='taskDetails' />
      </div>
      <div className='AddTaskForm-column'>
        <button className='AddTaskForm-addButton' onClick={handleSaveTask} >Add Task</button>
      </div>
    </form>
  );
}

export default AddTask;