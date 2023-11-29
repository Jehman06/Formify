import React, { useEffect, useContext, useState } from "react";
import './Navbar.css';
import { ProjectContext } from "../../contexts/project.context";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import formify from '../../assets/formify.png';
import { UserContext } from "../../contexts/user.context";
import Dropdown from "./Dropdown/Dropdown";
import DropdownButton from "./Dropdown/DropdownButton";
import NewForm from "./NewForm";
import DropdownContent from "./Dropdown/DropdownContent";
import DropdownList from "./Dropdown/DropdownList";
import DropdownItem from "./Dropdown/DropdownItem";

const Navbar = () => {
    const { logOutUser } = useContext(UserContext);
    const { projects, fetchProjects, setProjects } = useContext(ProjectContext);
    const [isNewFormDropdownOpen, setIsNewFormDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleNewFormDropdown = () => {
        setIsNewFormDropdownOpen(!isNewFormDropdownOpen);
    };

    const closeNewFormDropdown = () => {
        setIsNewFormDropdownOpen(false);
    };

    const fetchAndSetProjects = async () => {
        try {
            const newProjects = await fetchProjects();
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSetProjects();
    }, []);

    // Potential notifications feature
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    }

    return (
        <div className='navbar-container'>
            <div className='logo'>
                <img src={formify} alt='logo' />
                <div className='dropdown-container'>
                    <Dropdown className='project-dropdown'>
                        <DropdownButton>Projects</DropdownButton>
                        <DropdownContent>
                            {projects ? (
                                <DropdownList>
                                    {projects.map((project, index) => (
                                        <DropdownItem key={index} project={project.value}>
                                            {project.label}
                                        </DropdownItem>
                                    ))}
                                </DropdownList>
                            ) : (
                                <p>No projects available</p>
                            )}
                        </DropdownContent>
                    </Dropdown>
                </div>
            </div>
            <div className='nav'>
                <p className='new-form' onClick={toggleNewFormDropdown}><AddCircleOutlineIcon />New Form</p>
                {isNewFormDropdownOpen && (
                    <NewForm
                        isOpen={isNewFormDropdownOpen}
                        onClose={closeNewFormDropdown}
                        onSubmit={fetchAndSetProjects} // Call refreshProjects after a new project is created
                    />
                )}
                <p onClick={toggleNotifications}><NotificationsIcon /></p>
                <p><LogoutIcon onClick={logOutUser} /></p>
            </div>
        </div>
    )
}

export default Navbar;