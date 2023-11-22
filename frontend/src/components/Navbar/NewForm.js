import React, { useState, useContext } from "react";
import axios from "axios";
import './NewForm.css';
import { UserContext } from "../../contexts/user.context";
import { ProjectContext } from '../../contexts/project.context'
import { generateUniqueToken } from '../../utilities/utilities';

const baseURL = 'https://www.formifyapp.com';

const NewForm = ({ isOpen, onClose, onSubmit }) => {
    const [form, setForm] = useState({ name: '' }); // Initialize form as an object
    const { user } = useContext(UserContext);
    const { setSelectedProject } = useContext(ProjectContext);

    const handleCreateNewProject = async () => {
        try {
            if (!user) {
                console.error('User not authenticated. Please log in.');
                return;
            }

            const name = form.name;
            const userId = user.id;

            // Generate a unique token for the project
            const projectToken = generateUniqueToken();

            const response = await axios.post(`${baseURL}/projects/new`, {
                name,
                userId,
                token: projectToken,
            });

            if (response.status === 201) {
                console.log('Project created successfully!');

                // Clear the form input
                setForm({ name: '' });

                // Close the dropdown
                onClose();

                // Update the selected project in your context
                setSelectedProject(response.data);

                // Call the onSubmit function to update the projects state in the Navbar component
                onSubmit(response.data);
            } else {
                console.error('Failed to create project');
            }
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
            <form>
                <input
                    className='create-new-form-input'
                    name='name'
                    type="text"
                    placeholder="Project Name"
                    value={form.name} // Bind the value of the input to form.name
                    onChange={onFormInputChange}
                    required
                />
                <button
                    className='create-new-form-button'
                    type="button" // Use type="button" to prevent form submission
                    onClick={handleCreateNewProject}
                >
                    Create
                </button>
            </form>
            <button className='close-new-form-button' onClick={onClose}>Close</button>
        </div>
    );
}

export default NewForm;