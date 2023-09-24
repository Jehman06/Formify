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
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch the data, specifically for user and project
    const fetchFormData = async () => {
        try {
            if (!selectedProject || !user) {
                setLoading(false); // Stop loading
                return;
            }

            const response = await axios.get(`${baseURL}/forms/${selectedProject.token}?userId=${user.id}`);
            setForms(response.data);
            setLoading(false); // Stop loading
        } catch (error) {
            console.error('Error fetching Form data: ', error);
            setLoading(false); // Stop loading on error
        }
    }

    // Function to delete a form
    const deleteForm = async (formId) => {
        try {
            // Make a DELETE request to the server's endpoint with the correct formId
            const response = await axios.delete(`http://localhost:3001/forms/${formId}`);

            // Check if the response status is 200, indicating success
            if (response.status === 200) {
                // Update local state by removing the deleted form
                setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
            } else {
                console.error('Failed to delete form. Server returned status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    }

    // Fetch data whenever selectedProject is selected
    useEffect(() => {
        if (selectedProject) {
            fetchFormData();
        }
    }, [selectedProject]);

    // Filter forms based on search query
    const filteredForms = forms.filter((form) => {
        const fullName = `${form.first_name} ${form.middle_name} ${form.last_name}`;
        const lowerCaseSearchQuery = searchQuery.toLowerCase(); // Convert searchQuery to lowercase
        const searchQueryStr = searchQuery.toString(); // Convert searchQuery to a string

        return (
            (form.name && form.name.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.email && form.email.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.phone_number && form.phone_number.includes(searchQueryStr)) ||
            (fullName.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.address && form.address.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.address2 && form.address2.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.city && form.city.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.state && form.state.toLowerCase().includes(lowerCaseSearchQuery)) ||
            ((form.zip && typeof form.zip === 'number' && form.zip.toString().includes(searchQueryStr))) ||
            (form.country && form.country.toLowerCase().includes(lowerCaseSearchQuery)) ||
            (form.message && form.message.toLowerCase().includes(lowerCaseSearchQuery))
        );
    });

    return (
        <div className='submissions-container'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {filteredForms.length === 0 ? (
                        <p className='no-sub-message'>You don't have any submissions for this project.</p>
                    ) : (
                        <div className='search'>
                            <input
                                type="text"
                                placeholder="Search forms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}

                    {filteredForms
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort forms by date in descending order
                        .map((form, index) => (
                            <div className='form-item' key={index}>
                                <div className='delete-button' onClick={() => deleteForm(form._id)}>
                                    <DeleteIcon />
                                </div>

                                <div className='date'>
                                    <p>{new Date(form.date).toLocaleString()}</p>
                                </div>

                                <div className='contact-info'>
                                    <p><b>{form.name}</b></p>
                                    <p><b>{form.first_name} {form.middle_name} {form.last_name}</b></p>
                                    <p>{form.email}</p>
                                    <p>{form.phone_number}</p>
                                </div>

                                <div className='address'>
                                    <p>{form.address}</p>
                                    <p>{form.address2}</p>
                                    <p>{form.city ? form.city + ',' : ''} {form.state} {form.zip}</p>
                                    <p>{form.country}</p>
                                </div>

                                <div className='message'>
                                    <p><b>{form.message}</b></p>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    );

}

export default Submissions;