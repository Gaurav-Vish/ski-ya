import React, { useState } from 'react';
import ReactDOM from "react-dom/client"

const SkiResort = () => {
  const [resorts, setResorts] = useState([]);
  const [newResort, setNewResort] = useState({ name: '', location: '', runs: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setNewResort({ ...newResort, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newResort.name || !newResort.location || !newResort.runs) return;
    if (editId !== null) {
      setResorts(resorts.map((resort) => (resort.id === editId ? { ...newResort, id: editId } : resort)));
      setEditId(null);
    } else {
      setResorts([...resorts, { ...newResort, id: resorts.length + 1 }]);
    }
    setNewResort({ name: '', location: '', runs: '' });
  };

  const handleEdit = (id) => {
    setEditId(id);
    setNewResort(resorts.find((resort) => resort.id === id));
  };

  const handleDelete = (id) => {
    setResorts(resorts.filter((resort) => resort.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newResort.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={newResort.location}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Runs"
          name="runs"
          value={newResort.runs}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Runs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resorts.map((resort) => (
            <tr key={resort.id}>
              <td>{resort.name}</td>
              <td>{resort.location}</td>
              <td>{resort.runs}</td>
              <td>
                <button onClick={() => handleEdit(resort.id)}>Edit</button>
                <button onClick={() => handleDelete(resort.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SkiResort/>);