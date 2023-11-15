import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Form from "../components/Form/Form";
import { UserContext } from "../contexts/user.context";
import { ProjectProvider } from "../contexts/project.context";
import { DropdownProvider } from "../contexts/dropdown.context";

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <ProjectProvider>
            <DropdownProvider>
                <div style={{ backgroundColor: '#252934', minHeight: '100vh' }}>
                    <Navbar />
                    <Form />
                </div>
            </DropdownProvider>
        </ProjectProvider>
    )
}

export default Home;