import React, { useState, useContext, useEffect } from "react";
import './Submissions.css';
import { ProjectContext } from "../../../contexts/project.context";
import { UserContext } from "../../../contexts/user.context";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
const baseURL = 'http://localhost:3001';

const Submissions = () => {
    const { selectedProject } = useContext(ProjectContext);
    const { user } = useContext(UserContext);

    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState([]);

    const fetchFormData = async () => {
        try {
            if (!selectedProject || !user) {
                setLoading(false); // Stop loading
                return;
            }

            const response = await axios.get(`${baseURL}/forms/${selectedProject.token}?userId=${user.id}`);
            setForms(response.data);
            setLoading(false); // Stop loading
            console.log(forms);
        } catch (error) {
            console.error('Error fetching Form data: ', error);
            setLoading(false); // Stop loading on error
        }
    }

    const deleteForm = async (formId) => {
        try {
            // Make a DELETE request to the server's endpoint with the correct formId
            const response = await axios.delete(`http://localhost:3001/forms/${formId}`);

            // Check if the response status is 200, indicating success
            if (response.status === 200) {
                // Update your local state by removing the deleted form
                setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
            } else {
                console.error('Failed to delete form. Server returned status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting form:', error);
            // Handle any errors that occur during the deletion process.
        }
    }

    useEffect(() => {
        if (selectedProject) {
            fetchFormData();
        }
    }, [selectedProject]);

    return (
        <div className='submissions-container'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {forms
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort forms by date in descending order
                        .map((form, index) => (
                            <div className='form-item' key={index}>
                                <button onClick={() => deleteForm(form._id)}><DeleteIcon /></button>
                                <p>{new Date(form.date).toLocaleString()}</p>
                                <p>{form.name}</p>
                                <p>{form.first_name} {form.middle_name} {form.last_name}</p>
                                <p>{form.email}</p>
                                <p>{form.phone_number}</p>
                                <p>{form.address}</p>
                                <p>{form.address2}</p>
                                <p>{form.country}</p>
                                <p>{form.city}</p>
                                <p>{form.state}</p>
                                <p>{form.zip}</p>
                                <p>{form.message}</p>
                            </div>
                        ))}
                </>
            )}
        </div>
    )
}

export default Submissions;