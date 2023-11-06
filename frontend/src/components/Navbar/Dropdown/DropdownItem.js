import React, { useEffect } from "react";
import { useContext } from "react";
import { ProjectContext } from "../../../contexts/project.context";

function DropdownItem({ children, ...props }) {
    const { setSelectedProject, selectedProject } = useContext(ProjectContext);

    const handleClick = () => {
        setSelectedProject(props.project); // Set the selected project when clicked
    };

    // useEffect(() => {
    //     console.log('selectedProject: ', selectedProject);
    // }, [selectedProject]);


    return (
        <li>
            <div className="py-3 px-5 whitespace-nowrap dropdown-item" onClick={handleClick}>
                {children}
            </div>
        </li>
    );
}

export default DropdownItem;