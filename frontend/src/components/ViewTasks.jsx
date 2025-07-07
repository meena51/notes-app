import React, { useEffect, useState } from 'react';
import './ViewTasks.css';
import './CreateNote.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const markCompleted = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'PUT',
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
    <nav className="head">
        <h1>Notes App</h1>
        

<Link to="/" className="nav-right">
 <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: "8px" }} />
Create</Link>
</nav>
    <div className="view-container">
      
      <table className="tasks-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {tasks.map((task,index) => (
    <tr key={task.id} className={task.is_completed ? 'completed' : ''}>
      <td>{index+1}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        <input
  type="checkbox"
  checked={task.is_completed}
  onChange={() => markCompleted(task.id)}
/>

      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          className="action-icon delete"
          onClick={() => deleteTask(task.id)}
        />
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
    </div>
  );
}

export default ViewTasks;
