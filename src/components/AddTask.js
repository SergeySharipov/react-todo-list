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
    <form>
      <input onChange={handleChange} className='form-task_title' name='taskTitle' />
      <input onChange={handleChange} className='form-task_details' name='taskDetails' />
      <button className='form-add_button' onClick={handleSaveTask} >Add Task</button>
    </form>
  );
}

export default AddTask;