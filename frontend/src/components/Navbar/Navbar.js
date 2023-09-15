import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { ProjectContext } from "../../contexts/project.context";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import submitz from '../../assets/submitz.png';
import { UserContext } from "../../contexts/user.context";
import Dropdown from 'react-dropdown';
import NewForm from "./NewForm";
import axios from 'axios';

const Navbar = () => {
    const { logOutUser } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { projects, selectedProject, setSelectedProject, fetchProjects, } = useContext(ProjectContext);

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

    useEffect(() => {
        fetchProjects(); // Fetch the list of projects
    }, [selectedProject]); // Add selectedProject as a dependency


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
                    {/* Conditionally render the dropdown component */}
                    {isDropdownOpen && (
                        <NewForm
                            isOpen={isDropdownOpen}
                            onClose={closeDropdown}
                        />
                    )}
                </div>
                <p><NotificationsIcon /></p>
                <p><LogoutIcon onClick={logOutUser} /></p>
            </div>
        </div>
    )
}

export default Navbar;