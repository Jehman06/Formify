import React, { useEffect, useState } from "react";
import './Notifications.css';
import io from 'socket.io-client';

const NotificationPopover = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Connect to the WebSocket server
        const socket = io('http://localhost:3001');

        // Listen for new form submission notification
        socket.on('newFormSubmission', (formData) => {
            // Update the notifications state with the new form data
            setNotifications((prevNotifications) => [...prevNotifications, formData]);
        });

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="notifications-popover">
            <div className="popover-header">
                <ul className="notification-list">
                    {notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                            {notification.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NotificationPopover;