import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Submissions from "../components/Submissions/Submissions";

const Home = () => {
    return (
        <div style={{ backgroundColor: '#004f9e' }}>
            <Navbar />
            <Submissions />
        </div>
    )
}

export default Home;