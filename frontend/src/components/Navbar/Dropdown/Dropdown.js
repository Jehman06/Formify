import React, { useContext } from "react";
import '../Navbar.css';

function Dropdown({ children }) {
    return (
        <div className='dropdown'>{children}</div>
    );
}

export default Dropdown;