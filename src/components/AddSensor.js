import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../assets/css/AddSensor.css';

function AddSensor() {
  const [devices, setDevices] = useState([]);
  const [newSensor, setNewSensor] = useState({
    id_device: "",
    temperature: "22",
    humidity: "22",
    light: "22",
    status_light: "false"
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('deviceId');

  useEffect(() => {
    fetchDevices();
    if (deviceId) {
      setNewSensor({ ...newSensor, id_device: deviceId });
    }
  }, [deviceId]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getAllDevices");
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSensor({ ...newSensor, [name]: value });
  };

  const handleAddSensor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/addSensors", newSensor);
      if (response.status === 200) {
        setNewSensor({ id_device: "", temperature: "22", humidity: "22", light: "22", status_light: "false" });
        alert("Sensor added successfully");
      }
    } catch (error) {
      console.error("Error adding sensor:", error);
    }
  };

  return (
    <div className="add-sensor-container">
      <h1>Add Sensor</h1>
      <form className="add-sensor-form" onSubmit={handleAddSensor}>
        <select
          name="id_device"
          value={newSensor.id_device}
          onChange={handleInputChange}
          required
          disabled
        >
          <option value="" disabled>Select Device</option>
          {devices.map((device) => (
            <option key={device._id} value={device._id}>{device.name}</option>
          ))}
        </select>
        <input
          type="text"
          name="temperature"
          placeholder="Temperature"
          value={newSensor.temperature}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="humidity"
          placeholder="Humidity"
          value={newSensor.humidity}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="light"
          placeholder="Light"
          value={newSensor.light}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="status_light"
          placeholder="Status Light"
          value={newSensor.status_light}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Sensor</button>
      </form>
    </div>
  );
}

export default AddSensor;
