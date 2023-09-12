import React, { useEffect, useState, useContext } from 'react';
import './Submissions.css';
import { UserContext } from "../../contexts/user.context";
import axios from 'axios';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);

    const { logOutUser } = useContext(UserContext);

    useEffect(() => {
        axios
            .get('http://localhost:3001/api')
            .then((response) => {
                setSubmissions(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    if (!Array.isArray(submissions)) {
        return <div>No submissions available.</div>;
    }

    const handleDeleteSubmission = (submissionId) => {
        axios
            .delete(`http://localhost:3001/api/${submissionId}`)
            .then(() => {
                setSubmissions((prevSubmissions) =>
                    prevSubmissions.filter((submission) => submission._id !== submissionId)
                );
            });
    };

    return (
        <div className="container mt-5">
            <div className="container submission-container">
                <h2 className='hello2'>Submissions:</h2>
                <div className="row submissions">
                    {submissions.map((submission, index) => (
                        <div key={index} className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <button
                                        className="btn btn-danger float-end"
                                        onClick={() => handleDeleteSubmission(submission._id)}
                                    >
                                        Delete
                                    </button>
                                    {new Date(submission.date).toLocaleString()}
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">{submission.name}</h3>
                                    <p className="card-text">
                                        <b>{submission.first_name}</b>
                                    </p>
                                    <p className="card-text">
                                        <b>{submission.middle_name}</b>
                                    </p>
                                    <p className="card-text">
                                        <b>{submission.last_name}</b>
                                    </p>
                                    <a href={`mailto:${submission.email}`} className="card-link">
                                        <i className="bi bi-envelope"></i> {submission.email}
                                    </a>
                                    <p className="card-text">
                                        <i className="bi bi-telephone"></i>{' '}
                                        <a href={`tel:${submission.phone_number}`}>
                                            {submission.phone_number}
                                        </a>
                                    </p>
                                    <p className="card-text">{submission.address}</p>
                                    <p className="card-text">{submission.address2}</p>
                                    <p className="card-text">{submission.country}</p>
                                    <p className="card-text">{submission.city}</p>
                                    <p className="card-text">{submission.state}</p>
                                    <p className="card-text">{submission.zip}</p>
                                    <p className="card-title">Message:</p>
                                    <p className="card-text">
                                        <i>{submission.message}</i>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Submissions;