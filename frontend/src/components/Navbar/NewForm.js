import React, { useState } from "react";
import axios from "axios";
import './NewForm.css';

const baseURL = 'http://localhost:3001';

const NewForm = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const name = form.name;
            const response = await axios.post(`${baseURL}/api/projects/new`, { name });

            if (response.status === 201) {
                console.log('Project created successfully!');
                // You can update the UI or perform other actions here
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error in creating project: ', error);
        }
        // Logic to create a new project.

    };

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={`dropdown ${isOpen ? 'open' : ''}`}>
            <form onSubmit={handleSubmit}>
                <input className='create-new-form-input' name='name' type="text" placeholder="Project Name" onChange={onFormInputChange} />
                <button className='create-new-form-button' type="submit">Create</button>
            </form>
            <button className='close-new-form-button' onClick={onClose}>Close</button>
        </div>
    );
}

export default NewForm;