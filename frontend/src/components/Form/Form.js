import React, { useContext, useState, useEffect } from 'react';
import './Form.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import { ProjectContext } from '../../contexts/project.context';
import { UserContext } from '../../contexts/user.context';
import Submissions from './Submissions/Submissions';
import FormNavbar from './FormNavbar/FormNavbar';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Form = () => {
    const { selectedProject, setSelectedProject, setProjects } = useContext(ProjectContext);
    const { user } = useContext(UserContext);
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedEndpoint, setCopiedEndpoint] = useState(false);
    const [copyMessageVisibleEndpoint, setCopyMessageVisibleEndpoint] = useState(false);
    const [copiedSnippet, setCopiedSnippet] = useState(false);
    const [copyMessageVisibleSnippet, setCopyMessageVisibleSnippet] = useState(false);
    const [activeView, setActiveView] = useState('documentation');
    const [endpointUrl, setEndpointUrl] = useState('');
    const baseURL = 'https://formifyapp-8ce7dd1aa796.herokuapp.com';

    const location = useLocation();
    const { search } = location;
    const searchParams = new URLSearchParams(search);
    const projectToken = searchParams.get('project');

    const codeSnippet = `
        <form
            action="${endpointUrl}"
            method="POST"
        >
            <label>
                Your name:
                <input name="name" type="text">
            </label>

            <label>
                Your email:
                <input name="email" type="email">
            </label>

            <label>
                Your message:
                <textarea name="message"></textarea>
            </label>

            <!-- your other form attributes here -->
            <button type="submit">Send</button>
        </form>
    `;

    // Fetch form data if a project is selected or if a projectToken is present in the URL
    useEffect(() => {
        if (selectedProject) {
            const newEndpointUrl = `https://formifyapp-8ce7dd1aa796.herokuapp.com/forms/submit/${selectedProject.token}/${user.id}`;
            setEndpointUrl(newEndpointUrl);
            fetchFormData();

        } else if (projectToken) {
            axios.get(`https://formifyapp-8ce7dd1aa796.herokuapp.com/projects/${projectToken}`)
                .then((response) => {
                    const projectData = response.data;
                    setSelectedProject(projectData);
                    const newEndpointUrl = `https://formifyapp-8ce7dd1aa796.herokuapp.com/forms/submit/${projectData.token}/${user.id}`;
                    setEndpointUrl(newEndpointUrl);
                    fetchFormData();
                    console.log('Selected project in ProjectProvider: ', selectedProject)
                })
                .catch((error) => {
                    console.error('Error fetching project data: ', error);
                });
        }
    }, [selectedProject, user.id, projectToken]);

    // Fetch form data for the selected project
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

    // Copy the endpoint to the clipboard
    const copyToClipboardEndpoint = async () => {
        try {
            await navigator.clipboard.writeText(endpointUrl);
            setCopiedEndpoint(true);
            setCopyMessageVisibleEndpoint(true); // Show copy message for endpoint
            setTimeout(() => {
                setCopiedEndpoint(false);
                setCopyMessageVisibleEndpoint(false); // Hide copy message after 3 seconds
            }, 3000);
        } catch (error) {
            console.error('Error copying endpoint to clipboard: ', error);
        }
    };

    // Copy the code snippet to the clipboard
    const copyToClipboardCodeSnippet = async () => {
        try {
            await navigator.clipboard.writeText(codeSnippet);
            setCopiedSnippet(true);
            setCopyMessageVisibleSnippet(true); // Show copy message for code snippet
            setTimeout(() => {
                setCopiedSnippet(false);
                setCopyMessageVisibleSnippet(false); // Hide copy message after 3 seconds
            }, 3000);
        } catch (error) {
            console.error('Error copying code snippet to clipboard: ', error);
        }
    };

    const handleDeleteProject = async () => {
        // Make the user confirm the deletion of the project
        const shouldDelete = window.confirm('This action will permanently delete the project as well as all the submissions related to it. Do you really want to delete this project?');
        if (!shouldDelete) {
            return; // User cancelled the delete operation
        }

        try {
            // Make an http request to delete the project
            const response = await axios.delete(`${baseURL}/projects/${selectedProject.token}`);

            if (response.status === 200) {
                // Project deleted successfully, update UI accordingly
                setSelectedProject(null); // Clear the selected project

                // Update the list of projects and remove the deleted project
                setProjects((projects) => projects.filter((project) => project.value.token !== selectedProject.token));
            } else {
                // Handle any error scenario
                console.error('Failed to delete the project');
            };

        } catch (error) {
            // Handle network error and other issues
            console.error('Error deleting the project: ', error);
        }
    };

    return (
        <div className='form-container' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            {selectedProject ? (
                <>
                    <div className="title-with-delete">
                        <h1 style={{ color: 'white' }}>
                            {selectedProject ? selectedProject.name : 'No project selected'}
                        </h1>
                        <div className='delete-project' onClick={handleDeleteProject}>
                            <DeleteIcon />
                        </div>
                    </div>

                    <FormNavbar setActiveView={setActiveView} />
                    <br />
                    {activeView === 'documentation' && (
                        <div className='doc-container'>
                            {selectedProject && (
                                <div className='endpoint'>
                                    <h4 className='form-endpoint'>Your form's endpoint is:</h4>
                                    {selectedProject && (
                                        <div className='copy-endpoint'>
                                            <div className='copy-container'>
                                                <p className='endpoint-text'>
                                                    {endpointUrl}
                                                </p>
                                            </div>
                                            <div className='copy'>
                                                {copyMessageVisibleEndpoint && <div className='copy-message'>Copied</div>}
                                                <ContentCopyIcon className='copy-icon' onClick={copyToClipboardEndpoint} />
                                            </div>
                                        </div>
                                    )}
                                    <p>Place this URL in the action attribute of your form, and make sure to use <b>method="POST"</b>. Each input should have a name attribute.</p>
                                    <h4>Integrate with your use case!</h4>
                                    <p>Check out the code snippet below and customize it to suit your specific requirements:</p>
                                </div>
                            )}
                            <div className="code-snippet-container">
                                {copyMessageVisibleSnippet && <div className='copy-snippet'>Copied</div>}
                                <ContentCopyIcon className="copy-button" onClick={copyToClipboardCodeSnippet} />
                                <SyntaxHighlighter language="html" style={vscDarkPlus}>
                                    {codeSnippet}
                                </SyntaxHighlighter>
                            </div>
                            <p>There are a number of attributes that you can use:</p>
                            <ul>
                                <li>first_name</li>
                                <li>middle_name</li>
                                <li>last_name</li>
                                <li>name</li>
                                <li>email</li>
                                <li>phone_number</li>
                                <li>address</li>
                                <li>address2</li>
                                <li>country</li>
                                <li>city</li>
                                <li>state</li>
                                <li>zip</li>
                                <li>message</li>
                            </ul>
                            <p>After completion, navigate to the Submissions tab on this page to view a comprehensive list of all your forms!</p>
                        </div>
                    )}
                    {activeView === 'submissions' && (
                        // Render the Submissions component when the active view is 'submissions'
                        <Submissions />
                    )}
                </>
            ) : (
                <div className='no-proj-selected'>
                    {/* No project selected */}
                    <h1>Select or create a project.</h1>
                </div>
            )}
        </div>
    );
}

export default Form;