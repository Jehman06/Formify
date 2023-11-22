import React, { useState } from 'react';
import './FormNavbar.css';

const FormNavbar = ({ setActiveView }) => {
    const [activeTab, setActiveTab] = useState('documentation'); // Default active tab to docs

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveView(tab); // Notify the parent component about the selected view
    };

    return (
        <div className="form-navbar">
            <div
                className={`navbar-tab ${activeTab === 'documentation' ? 'active' : ''}`}
                onClick={() => handleTabClick('documentation')}
            >
                Documentation
            </div>
            <div
                className={`navbar-tab ${activeTab === 'submissions' ? 'active' : ''}`}
                onClick={() => handleTabClick('submissions')}
            >
                Submissions
            </div>
        </div>
    );
};

export default FormNavbar;