import React, { useEffect, useState, useContext } from "react";
import './Navbar.css';
import { ProjectContext } from "../../contexts/project.context";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import submitz from '../../assets/submitz.png';
import { UserContext } from "../../contexts/user.context";
import Dropdown from 'react-dropdown';
import NewForm from "./NewForm";
import axios from 'axios';
import NotificationPopover from "./Notifications";
import io from 'socket.io-client';

const Navbar = () => {
    const { logOutUser } = useContext(UserContext);
    const { projects, selectedProject, setSelectedProject, fetchProjects } = useContext(ProjectContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleDropdownChange = (selectedOption) => {
        if (selectedOption) {
            setSelectedProject(selectedOption.value);
        } else {
            setSelectedProject(null);
        }
    }

    const refreshProjects = async () => {
        // Fetch the updated list of projects
        await fetchProjects();
    }

    useEffect(() => {
        console.log('SelectedProject in Navbar: ', selectedProject);
        console.log('setSelectedProject in Navbar: ', setSelectedProject);
        fetchProjects(); // Fetch the initial list of projects
    }, [selectedProject]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    }

    useEffect(() => {
        const socket = io.connect('http://localhost:3001/');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('newFormSubmission', (formData) => {
            // Handle the new form submission notification here if needed
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
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
                    <Dropdown
                        options={projects}
                        value={selectedProject ? selectedProject.value : undefined}
                        onChange={handleDropdownChange}
                        className='dropdown'
                        placeholder='Projects'
                    />
                </div>
            </div>
            <div className='nav'>
                <p onClick={toggleDropdown}><AddCircleOutlineIcon />New Form</p>
                <div className='new-form'>
                    {isDropdownOpen && (
                        <NewForm
                            isOpen={isDropdownOpen}
                            onClose={closeDropdown}
                            onSubmit={refreshProjects} // Call refreshProjects after a new project is created
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