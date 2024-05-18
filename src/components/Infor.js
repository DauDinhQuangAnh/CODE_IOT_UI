import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Loading from "./Loading";
import { FaLightbulb, FaRegLightbulb, FaTemperatureHigh, FaTint, FaCloud } from 'react-icons/fa'; // Import các biểu tượng từ react-icons
import arduinor3IMG from "../assets/img/arduinor3.png";
import "../assets/css/Infor.css";

function Infor() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get('id') || "";
  const deviceName = urlParams.get('name') || "Unknown Device";
  const deviceStatus = urlParams.get('status') === 'true';
  const deviceUpdatedAt = urlParams.get('updatedAt') || "Unknown Time";

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handOnLight = () => {
    if (data) {
      console.log('on');
      axios
        .put("https://control-devices.onrender.com/api/updateSensor/" + id, {
          humidity: data.humidity,
          temperature: data.temperature,
          light: data.light,
          status_light: 1,
        })
        .catch((error) => {
          console.error("Error updating sensor data:", error);
        });
    }
  };

  const handOffLight = () => {
    if (data) {
      console.log("off");
      axios
        .put("https://control-devices.onrender.com/api/updateSensor/" + id, {
          humidity: data.humidity,
          temperature: data.temperature,
          light: data.light,
          status_light: 0,
        })
        .catch((error) => {
          console.error("Error updating sensor data:", error);
        });
    }
  };

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:3001/api/getDeviceById/" + id)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching device data:", error);
        });
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <>
      <Header />
      <div className="Infor">
        <div className="dvimg">
          <img
            className="device_img-child"
            src={arduinor3IMG}
            alt="Device"
          />
        </div>
        <h2>Device Name: {deviceName}</h2>
        <p className={`status-text ${deviceStatus ? "online" : "offline"}`}>
          Status: {deviceStatus ? "Online" : "Offline"}
        </p>
        <p>Last Updated: {deviceUpdatedAt}</p>
        <div className="controller">
          {data ? (
            <>
              <div className="controller-tools">
                <div className="title">
                  Temperature Room <FaTemperatureHigh className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    {data.temperature}
                    <div className="infor-unit">°</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">
                  Humidity Room <FaTint className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    {data.humidity}
                    <div className="infor-unit">%</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">
                  Light Room <FaCloud className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    {data.light}
                    <div className="infor-unit">lux</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="controller-tools">
                <div className="title">
                  Temperature Room <FaTemperatureHigh className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    <div className="infor-unit">°</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">
                  Humidity Room <FaTint className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    <div className="infor-unit">%</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">
                  Light Room <FaCloud className="icon" />
                </div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    <div className="infor-unit">lux</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="lights">
          <button style={{fontSize:"20px", fontWeight:"bold"}} onClick={handOnLight} className="light light1">
            ON<FaLightbulb className="icon-light" />
          </button>
          <button style={{fontSize:"20px", fontWeight:"bold"}} onClick={handOffLight} className="light light2">
            OFF<FaRegLightbulb className="icon-light" />
          </button>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}

export default Infor;
