import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './NewForm.css';
import { UserContext } from "../../contexts/user.context";
import { generateUniqueToken } from '../../utilities/utilities';

const baseURL = 'http://localhost:3001';

const NewForm = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                console.error('User not authenticated. Please log in.');
                return;
            }

            const name = form.name;
            const userId = user.id

            // Generate a unique token for the project
            const projectToken = generateUniqueToken();

            const response = await axios.post(`${baseURL}/projects/new`, {
                name,
                userId, // Send the userId in the request body
                token: projectToken,
            });

            if (response.status === 201) {
                console.log('Project created successfully!');
                // Reload the page to reflect changes
                window.location.reload();
            } else {
                console.error('Failed to create project');
            }

            console.log('userId: ', userId)
        } catch (error) {
            console.error('Error in creating project: ', error);
        }
    };

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={`dropdownn ${isOpen ? 'open' : ''}`}>
            <form onSubmit={handleSubmit}>
                <input className='create-new-form-input' name='name' type="text" placeholder="Project Name" onChange={onFormInputChange} required />
                <button className='create-new-form-button' type="submit">Create</button>
            </form>
            <button className='close-new-form-button' onClick={onClose}>Close</button>
        </div>
    );
}

export default NewForm;