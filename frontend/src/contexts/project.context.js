import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./user.context";

export const ProjectContext = createContext();

const baseURL = 'http://localhost:3001';

// Custom hook to use the projects context
export const useUserProjects = () => {
    return useContext(ProjectContext);
};

// Provide the context to the app
export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const { user } = useContext(UserContext);

    // Fetch projects data and store it in the projects state
    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${baseURL}/projects`, {
                params: {
                    userId: user.id
                }
            })
            setProjects(response.data.map(project => ({
                value: project,
                label: project.name,
            })));
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    }

    // Fetch project data and store it in the selectedProject state
    const fetchProject = async () => {
        try {
            const response = await axios.get(`${baseURL}/projects/${selectedProject.token}`, {
                params: {
                    userId: user.id,
                }
            });
            setSelectedProject(response.data);
        } catch (error) {
            console.error('Error fetching project', error)
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                selectedProject,
                setSelectedProject,
                fetchProjects,
                fetchProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
};