import React, { useContext } from "react";
import { DropdownContext } from "../../../contexts/dropdown.context";
import './Dropdown.css';

function DropdownContent({ children }) {
    const { open } = useContext(DropdownContext);

    return (
        <div className={`dropdown-projects-content ${open ? 'active' : ''}`}>
            {children}
        </div>
    );
}

export default DropdownContent;