import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import submitz from '../../assets/submitz.png';
import { UserContext } from "../../contexts/user.context";
import Dropdown from 'react-dropdown';
import NewForm from "./NewForm";
import axios from 'axios';
import ProjectsDropdown from "./Projects";

const Navbar = () => {
    const { logOutUser } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const [projects, setProjects] = useState([]);
    const [value, setValue] = useState('');

    const baseURL = 'http://localhost:3001';

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/projects`);
            // Assuming the response.data is an array of project objects
            setProjects(response.data.map(project => ({
                value: project.id, // Set the value based on your project data
                label: project.name // Set the label based on your project data
            })));
        } catch (error) {
            console.error('Error fetching projects: ', error);
        }
    }

    const handleDropdownChange = (selectedOption) => {
        setValue(selectedOption.value); // Update the selected value
    }

    return (
        <div className='navbar-container'>
            <div className='logo'>
                <img src={submitz} alt='logo' />
                <div className='dropdown-container'>
                    <Dropdown
                        options={projects}
                        value={value}
                        onChange={handleDropdownChange}
                        placeholder='Projects'
                        className='dropdown'
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