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

const Form = () => {
    const { selectedProject } = useContext(ProjectContext);
    const { user } = useContext(UserContext);
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedEndpoint, setCopiedEndpoint] = useState(false);
    const [copyMessageVisibleEndpoint, setCopyMessageVisibleEndpoint] = useState(false);
    const [copiedSnippet, setCopiedSnippet] = useState(false);
    const [copyMessageVisibleSnippet, setCopyMessageVisibleSnippet] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState('html'); // Potential feature
    const [activeView, setActiveView] = useState('documentation'); // Default view is 'documentation'
    const [endpointUrl, setEndpointUrl] = useState('');
    const baseURL = 'http://localhost:3001';

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

            <!-- your other form fields here -->
            <button type="submit">Send</button>
        </form>
    `;

    // Fetch form data if a project is selected
    useEffect(() => {
        if (selectedProject) {
            const newEndpointUrl = `http://localhost:3001/forms/submit/${selectedProject.token}/${user.id}`;
            setEndpointUrl(newEndpointUrl);
            fetchFormData();
        }
    }, [selectedProject, user.id]);

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

    return (
        <div className='form-container' style={{ color: 'white' }}>
            {selectedProject ? (
                <>
                    <h1 style={{ color: 'white' }}>{selectedProject.name}</h1>
                    <FormNavbar setActiveView={setActiveView} />
                    <br />
                    {activeView === 'documentation' && (
                        <div className='doc-container'>
                            {selectedProject && (  // Ensure selectedProject is defined
                                <div className='endpoint'>
                                    <h4>Your form's endpoint is:</h4>
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
                                    <p>Place this URL in the action attribute of your form, and make sure to use <b>method="POST"</b>. All input elements should have a name attribute.</p>
                                </div>
                            )}
                            <div className="code-snippet-container">
                                {copyMessageVisibleSnippet && <div className='copy-message'>Copied</div>}
                                <ContentCopyIcon className="copy-button" onClick={copyToClipboardCodeSnippet} />
                                <SyntaxHighlighter language="html" style={vscDarkPlus}>
                                    {codeSnippet}
                                </SyntaxHighlighter>
                            </div>
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
                    <h1>Select a project or create one.</h1>
                </div>
            )}
        </div>
    );
}

export default Form;