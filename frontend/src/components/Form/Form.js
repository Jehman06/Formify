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
    const [copied, setCopied] = useState(false);
    const [copyMessageVisible, setCopyMessageVisible] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState('html');
    const [activeView, setActiveView] = useState('documentation');
    const baseURL = 'http://localhost:3001';
    const endpointUrl = `http://localhost:3001/forms/submit/${selectedProject.token}/${user.id}`;

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
        `

    useEffect(() => {
        if (selectedProject) {
            fetchFormData();
        }
    }, [selectedProject]);

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

    const copyToClipboardEndpoint = async () => {
        try {
            await navigator.clipboard.writeText(endpointUrl);
            setCopied(true);
            setCopyMessageVisible(true); // Show copy message
            setTimeout(() => {
                setCopied(false);
                setCopyMessageVisible(false); // Hide copy message after 3 seconds
            }, 3000);
        } catch (error) {
            console.error('Error copying to clipboard: ', error);
        }
    };

    return (
        <div className='form-container' style={{ color: 'white' }}>
            <h1 style={{ color: 'white' }}>{selectedProject ? selectedProject.name : ''}</h1>
            <FormNavbar setActiveView={setActiveView} />
            <br />
            {activeView === 'documentation' && (
                <div className='doc-container'>
                    <div className='endpoint'>
                        <h4>Your form's endpoint is:</h4>
                        <div className='copy-endpoint'>
                            <div className='copy-container'>
                                <p className='endpoint-text'>http://localhost:3001/forms/submit/{selectedProject.token}/{user.id}</p>
                            </div>
                            <div className='copy'>
                                {copied && <div className='copy-message'>Copied</div>}
                                <ContentCopyIcon className='copy-icon' onClick={copyToClipboardEndpoint} />
                            </div>
                        </div>
                        <p>Place this URL in the action attribute of your form, and make sure to use <b>method="POST"</b>. All inputs elements should have a name attribute.</p>
                        <div className="code-snippet-container">
                            <ContentCopyIcon className="copy-button" />
                            <SyntaxHighlighter language="html" style={vscDarkPlus}>
                                {codeSnippet}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                    <div className='attributes'>
                        <h4>Attributes</h4>
                        <p>The different attributes available to use are:</p>
                        <ul>
                            <li>name</li>
                            <li>first_name</li>
                            <li>middle_name</li>
                            <li>last_name</li>
                            <li><b>email (required)</b></li>
                            <li>address</li>
                            <li>address2</li>
                            <li>country</li>
                            <li>state</li>
                            <li>city</li>
                            <li>zip</li>
                            <li><b>message</b></li>
                        </ul>
                    </div>
                    <br />
                    <br />
                </div>
            )}
            {activeView === 'submissions' && (
                <Submissions />
            )}
        </div>
    )
}

export default Form;