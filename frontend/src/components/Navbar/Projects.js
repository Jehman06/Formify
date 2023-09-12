import React, { useEffect, useState } from "react";
import './Project.css';
import axios from "axios";

const ProjectsDropdown = () => {
    const [projects, setProjects] = useState([]);
    const baseURL = 'http://localhost:3001';

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects: ', error);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className='projects-dropdown-container'>
            <div>
                {projects.map((project) => (
                    <p key={project._id}>{project.name}</p>
                ))}
            </div>
        </div>
    )
}

export default ProjectsDropdown;