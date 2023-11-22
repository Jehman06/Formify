import React from "react";
import { DropdownContext } from "../../../contexts/dropdown.context";
import '../Navbar.css';

function DropdownList({ children, ...props }) {
    const { setOpen } = React.useContext(DropdownContext);

    return (
        <ul
            onClick={() => setOpen(false)}
            className="dropdown-list"
            {...props}
        >
            {children}
        </ul>
    );
};

export default DropdownList;