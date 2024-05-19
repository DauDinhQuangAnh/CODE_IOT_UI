import "../assets/css/App.css";
import arduinor3IMG from "../assets/img/arduinor3.png";
import { useLayoutEffect, useState } from "react";
import axios from "axios";

const handleOpen = (device) => {
  const queryParams = new URLSearchParams(device).toString();
  window.location.href = `/infor?${queryParams}`;
};

function Activate_tools() {
  const [dataTools, setDataTools] = useState([]);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:3001/api/getAllDevices")
        .then((response) => {
          setDataTools(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching building data:", error);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      
      <div className="main">
        
        <div className="welcome-header">Course: Công nghệ Internet of things hiện đại - NT532.O21.CTTT</div>
        {/* <div className="welcome-name">Welcome to IOT Team ? Project</div> */}
        <div className="member-name">
          <div className="member">Member 1: Dau Dinh Quang Anh</div>
          <div className="member">Member 2: Nguyen Thuc Hoang Hung</div>
          <div className="member">Member 3: Nguyen Tran Chi Duc</div>
        </div>
        <br />
        <div className="device">All Devices</div>
    
        <div className="main_device">
          {dataTools.map((item, index) => (
            <div className="device" key={index}>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="time-status">
                  <div className={`status-${item.status ? "red" : "green"}`}></div>
                  <div className={`time-${item.status ? "red" : "green"}`}>{item.updatedAt}</div>
                </div>
              </div>
              <div className="device_img">
                <img
                  onClick={() => handleOpen(item)}
                  className="device_img-child"
                  src={arduinor3IMG}
                  alt="Device"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Activate_tools;
