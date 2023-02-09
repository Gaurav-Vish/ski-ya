import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from "react-dom/client"
import Webcam from "react-webcam";
import './index.css';

const SkiResort = () => {
  const [resorts, setResorts] = useState([]);
  const [newResort, setNewResort] = useState({ name: '', location: '', runs: '' });
  const [newResortPhoto, setNewResortPhoto] = useState(null);
  const [editId, setEditId] = useState(null);
  
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);
  
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
  }

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
    setNewResort({ name: '', location: '', runs: ''});
    setNewResortPhoto(null);
    setShowWebcam(false);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setNewResort(resorts.find((resort) => resort.id === id));
  };

  const handleDelete = (id) => {
    setResorts(resorts.filter((resort) => resort.id !== id));
  };

  useEffect(() => {
    document.title = "SKI-YA";  
  }, []);

  return (
    <div>
      <h1>SKI-YA</h1>
      <form id='form1' onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={newResort.name} onChange={handleChange} />
        <input type="text" placeholder="Location" name="location" value={newResort.location} onChange={handleChange} />
        <input type="number" placeholder="Runs" name="runs" value={newResort.runs} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
      <table id='tb1'>
        <thead>
          <tr>
            <th width='10%'>Name</th>
            <th width='10%'>Location</th>
            <th width='10%'>Runs</th>
            <th>Photos</th>
            <th width='10%'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resorts.map((resort) => (
            <tr key={resort.id}>
              <td width='10%'>{resort.name}</td>
              <td width='10%'>{resort.location}</td>
              <td width='10%'>{resort.runs}</td>
              <td>
                <button onClick={() => setShowWebcam(!showWebcam)}>
                {showWebcam ? 'Close Webcam' : 'Open Webcam'}
                </button>
                {showWebcam && (
                  <Webcam ref={webcamRef} imageSmoothing={true} audio={false} height={200} width={200} screenshotFormat="image/jpeg" videoConstraints={videoConstraints}  />
                  )}
                {/* <img alt="not found" width={250} src={URL.createObjectURL(newResortPhoto)} /> */}
                <input type="file" name="myImage" onChange={(event) => { console.log(event.target.files[0]); setNewResortPhoto(event.target.files[0]); }} />
              </td>
              <td width='10%'>
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