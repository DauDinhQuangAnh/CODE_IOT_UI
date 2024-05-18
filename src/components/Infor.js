import "../assets/css/Infor.css";
import axios from "axios";
import React, {useLayoutEffect, useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";


function Infor() {
  const queryString = window.location.search;
  const regex = /(?<=\?).+/;
  const match = queryString.match(regex);
  const id = match ? match[0] : "";
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null);

  const handOnLight = () => {
    console.log('on')
    axios
      .put("https://control-devices.onrender.com/api/updateSensor/" + id, {
        humidity: data.humidity,
        temperature: data.temperature,
        light: data.light,
        status_light: 1,
      })
      .catch((error) => {
        console.error("Error fetching building data:", error);
      });
  }
  const handOffLight = () => {
    console.log("off")
    axios
      .put("https://control-devices.onrender.com/api/updateSensor/" + id, {
        humidity: data.humidity,
        temperature: data.temperature,
        light: data.light,
        status_light: 0,
      })
      .catch((error) => {
        console.error("Error fetching building data:", error);
      });
  }
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      // setLoading(true);
      axios
        .get("http://localhost:3001/api/getDeviceById/" + id)
        .then((response) => {
          setData(response.data);
          console.log(response.data)
          // setLoading(false);
        })
        .catch((error) => {
          // setLoading(false)
          console.error("Error fetching building data:", error);
        });
    console.log('hi')
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <Header />
      <div className="Infor">
        <div className="controller">
          {data ? (
            <>
              <div className="controller-tools">
                <div className="title">Temperature Room</div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    {data.temperature}
                    <div className="infor-unit">°</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">Humidity Room</div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                    {data.humidity}
                    <div className="infor-unit">%</div>
                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">Light Room</div>
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
                <div className="title">Temperature Room</div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                  <div className="infor-unit">°</div>

                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">Humidity Room</div>
                <div className="infor_of--tool">
                  <div className="infor-number">
                  <div className="infor-unit">%</div>

                  </div>
                </div>
              </div>
              <div className="controller-tools">
                <div className="title">Light Room</div>
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
          <button onClick={() =>handOnLight()} className="light light1">
            <i className="fas fa-sun icon-light"></i>
          </button>
          <button onClick={() =>handOffLight()} className="light light2">
            <i className="fas fa-moon icon-light"></i>
          </button>
        </div>
      </div>
      {loading && <Loading/>}
    </>
  );
}

export default Infor;
