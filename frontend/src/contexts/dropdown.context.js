import React, { createContext, useState, useContext } from 'react';

// Create the context
const DropdownContext = createContext();

// Create a provider component to manage the state and actions
function DropdownProvider({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            {children}
        </DropdownContext.Provider>
    );
}

export { DropdownProvider, DropdownContext };