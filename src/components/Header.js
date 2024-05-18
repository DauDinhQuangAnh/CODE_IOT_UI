import React from "react";
import '../assets/css/Header.css';
import { FaHome, FaPlusCircle, FaUser } from "react-icons/fa";

const home = () => {
    window.location.href = "/home";
};

const addDevice = () => {
    window.location.href = "/device";
};

function Header() {
    const username = localStorage.getItem("username"); // Lấy tên người dùng từ localStorage

    return (
        <div className='nav'>
            <div className="nav-left">
                <div className="nav-item" onClick={home}>
                    <FaHome className="nav-icon" />
                    <span className="nav-text">HOME</span>
                </div>
                <div className="nav-item" onClick={addDevice}>
                    <FaPlusCircle className="nav-icon" />
                    <span className="nav-text">ADD DEVICE</span>
                </div>
            </div>
            <div className="nav-right">
                <div className="nav-item">
                    <FaUser className="nav-icon" />
                    <span className="nav-text">{username}</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
