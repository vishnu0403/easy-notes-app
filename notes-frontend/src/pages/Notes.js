import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Edit mode
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create a new note
  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      await API.post("/notes", {
        note_title: title,
        note_content: content,
      });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.note_id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  // Start editing a note
  const startEdit = (note) => {
    setEditId(note.note_id);
    setEditTitle(note.note_title);
    setEditContent(note.note_content);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Save edited note
  const saveEdit = async (id) => {
    try {
      await API.put(`/notes/${id}`, {
        note_title: editTitle,
        note_content: editContent,
      });
      setEditId(null);
      setEditTitle("");
      setEditContent("");
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to update note");
    }
  };

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Notes</h2>

      {/* Form to create a note */}
      <form onSubmit={createNote} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
        <button type="submit">Add Note</button>
      </form>

      {/* Display notes */}
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.note_id} style={{ marginBottom: 15 }}>
              {editId === note.note_id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ display: "block", marginBottom: 5, width: "100%" }}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ display: "block", marginBottom: 5, width: "100%" }}
                  />
                  <button onClick={() => saveEdit(note.note_id)}>Save</button>
                  <button onClick={cancelEdit} style={{ marginLeft: 5 }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{note.note_title}</strong>: {note.note_content}
                  <br />
                  <button onClick={() => startEdit(note)} style={{ marginRight: 5 }}>
                    Edit
                  </button>
                  <button onClick={() => deleteNote(note.note_id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
