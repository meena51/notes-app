import React from "react";
import "./CreateNote.css"; // Optional for custom styling
import { useState } from "react";
import { Link } from "react-router-dom";
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function CreateNote() {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Task saved successfully!");
        setTitle("");
        setDescription("");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to connect to backend");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
  };
  return (
    <div className="main-container">
      <nav className="head">
        <h1>Notes App</h1>
        

<Link to="/view" className="nav-right">
<FontAwesomeIcon icon={faClipboardList} style={{ marginRight: "8px" }} />
My Tasks</Link>

      </nav>
      <div className="note-container">
        

        <div className="note-card">
          <h2 className="note-header">
             <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: "8px" }} />
            Create Note</h2>
          <input type="text" className="note-title" placeholder="Title" 
          value={title}
            onChange={(e) => setTitle(e.target.value)}/>
          <textarea
            className="note-description"
            placeholder="Description"
            rows="5"
            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="note-actions">
            <button className="note-btn save" onClick={handleSave}>Save</button>
            <button className="note-btn cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
