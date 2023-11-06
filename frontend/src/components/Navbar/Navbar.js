import React, { useEffect, useContext, useState } from "react";
import './Navbar.css';
import { ProjectContext } from "../../contexts/project.context";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import submitz from '../../assets/submitz.png';
import { UserContext } from "../../contexts/user.context";
import Dropdown from "./Dropdown/Dropdown";
import DropdownButton from "./Dropdown/DropdownButton";
import NewForm from "./NewForm";
import NotificationPopover from "./Notifications";
import io from 'socket.io-client';
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
            if (Array.isArray(newProjects)) {
                setProjects((prevProjects) => [...prevProjects, ...newProjects]);
            } else {
                console.error('fetchProjects did not return an array:', newProjects);
            }
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

    useEffect(() => {
        const socket = io.connect('http://localhost:3001/');

        socket.on('connect', () => {
            // console.log('Connected to WebSocket server');
        });

        socket.on('newFormSubmission', (formData) => {
            // Handle the new form submission notification here if needed
        });

        socket.on('disconnect', () => {
            // console.log('Disconnected from WebSocket server');
        });

        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error: ', error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className='navbar-container'>
            <div className='logo'>
                <img src={submitz} alt='logo' />
                <div className='dropdown-container'>
                    <Dropdown>
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
                <p onClick={toggleNewFormDropdown}><AddCircleOutlineIcon />New Form</p>
                <div className='new-form'>
                    {isNewFormDropdownOpen && (
                        <NewForm
                            isOpen={isNewFormDropdownOpen}
                            onClose={closeNewFormDropdown}
                            onSubmit={fetchAndSetProjects} // Call refreshProjects after a new project is created
                        />
                    )}
                </div>
                <p onClick={toggleNotifications}><NotificationsIcon /></p>
                <p><LogoutIcon onClick={logOutUser} /></p>
            </div>
            {showNotifications && (
                <NotificationPopover />
            )}
        </div>
    )
}

export default Navbar;