import React, { useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../contexts/user.context";

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <div style={{ backgroundColor: '#004f9e' }}>
            <Navbar />
            <p style={{ fontSize: '9px', color: 'white', marginLeft: '5px' }}>{user._profile.data.email}</p>
        </div>
    )
}

export default Home;