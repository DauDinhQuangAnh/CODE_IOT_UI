import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/css/AddDevice.css';

function AddDevice() {
  const [devices, setDevices] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [newDevice, setNewDevice] = useState({
    user: localStorage.getItem("username") || "",
    name: "",
    isActive: true,
    message: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
    fetchSensors();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getAllDevices");
      setDevices(response.data);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const fetchSensors = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getAllSensors");
      setSensors(response.data);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/addDevices", newDevice);
      if (response.status === 200) {
        setNewDevice({ user: localStorage.getItem("username") || "", name: "", isActive: true, message: "" });
        fetchDevices();
      }
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const handleDeleteDevice = async (id_device) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/deleteDevice/${id_device}`);
      if (response.status === 200) {
        fetchDevices();
        fetchSensors(); // Update sensors after deleting the device
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleDeleteSensor = async (id_sensor) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/deleteSensor/${id_sensor}`);
      if (response.status === 200) {
        fetchSensors();
      }
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  const handleAddSensor = (id_device) => {
    navigate(`/sensor?deviceId=${id_device}`);
  };

  return (
    <div className="add-device-container">
      <h1>Add New Device</h1>
      <form className="add-device-form" onSubmit={handleAddDevice}>
        <input
          type="text"
          name="name"
          placeholder="Device Name"
          value={newDevice.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={newDevice.message}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Device</button>
      </form>
      <h2>Existing Devices</h2>
      <ul className="device-list">
        {devices.map((device) => (
          <li key={device._id} className="device-item">
            <p><strong>User:</strong> {device.user}</p>
            <p><strong>Name:</strong> {device.name}</p>
            <p><strong>Message:</strong> {device.message}</p>
            <p><strong>Status:</strong> {device.isActive ? "Active" : "Inactive"}</p>
            <button className="delete-button" onClick={() => handleDeleteDevice(device._id)}>Delete Device</button>
            <button className="add-sensor-button" onClick={() => handleAddSensor(device._id)}>Add Sensor</button>
            <h3>Sensors</h3>
            <ul className="sensor-list">
              {sensors.filter(sensor => sensor.id_device === device._id).map(sensor => (
                <li key={sensor._id} className="sensor-item">
                  <p><strong>Temperature:</strong> {sensor.temperature}</p>
                  <p><strong>Humidity:</strong> {sensor.humidity}</p>
                  <p><strong>Light:</strong> {sensor.light}</p>
                  <p><strong>Status Light:</strong> {sensor.status_light}</p>
                  <button onClick={() => handleDeleteSensor(sensor._id)}>Delete Sensor</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddDevice;
