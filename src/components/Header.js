import '../assets/css/Header.css'
const home = () => {
    window.location.href = "/home";
};

function Header(){
    return(
        <div className='nav'>
            <div className="nav_child" onClick={home}>
                <i className="fas fa-home nav_child--icon"></i>
            </div>
            <div className="nav_child">
                <i className="fas fa-wallet nav_child--icon"></i>
            </div>
            <div className="nav_child">
                <i  className="fas fa-dot-circle nav_child--icon"></i>
            </div>
            <div className="nav_child">
                <i className="fas fa-user nav_child--icon"></i>
            </div>
            <div className="nav_child">
                <i className="fas fa-ellipsis-h nav_child--icon"></i>
            </div>
        </div>
    )
}
export default Header;