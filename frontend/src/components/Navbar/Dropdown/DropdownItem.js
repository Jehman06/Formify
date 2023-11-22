import React, { useContext } from "react";
import { ProjectContext } from "../../../contexts/project.context";
import '../Navbar.css';

function DropdownItem({ children, ...props }) {
    const { setSelectedProject, selectedProject } = useContext(ProjectContext);

    const handleClick = () => {
        setSelectedProject(props.project); // Set the selected project when clicked
    };

    return (
        <li style={{ listStyleType: 'none' }}>
            <div className="dropdown-item" onClick={handleClick} style={{ color: 'black' }}>
                {children}
            </div>
        </li>

    );
}

export default DropdownItem;