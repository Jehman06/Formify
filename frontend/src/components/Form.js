import React, { useContext } from 'react';
import { ProjectContext } from '../contexts/project.context';

const Form = () => {
    const { selectedProject } = useContext(ProjectContext);

    console.log('selectedProject.token: ', selectedProject.token);

    return (
        <div>
            <h1 style={{ color: 'white' }}>This is the Form component.</h1>
            <br />
            <br />
            <p style={{ color: 'white' }}>API Token: {selectedProject.token}</p>
        </div>
    )
}

export default Form;