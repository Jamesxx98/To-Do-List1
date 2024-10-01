import React, { useState } from 'react';
import './App.css'; // Optional: Add custom styles

function App() {
  // State to manage the tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Handle adding or editing a task
  const addOrEditTask = () => {
    if (newTask.trim() === '') return; // Prevent empty tasks

    if (isEditing) {
      const updatedTasks = tasks.map((task, i) =>
        i === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    
    setNewTask(''); // Clear input field after adding or editing
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Handle editing a task
  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div className="input-container">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder={isEditing ? "Edit your task" : "Enter a new task"} 
        />
        <button onClick={addOrEditTask}>{isEditing ? "Edit Task" : "Add Task"}</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            <div>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
