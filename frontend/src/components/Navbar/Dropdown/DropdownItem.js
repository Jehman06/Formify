import React from "react";
import { Link } from "react-router-dom";

function DropdownItem({ children, ...props }) {
    return (
        <li>
            <Link className="py-3 px-5 whitespace-nowrap dropdown-item" {...props}>
                {children}
            </Link>
        </li>
    );
}


export default DropdownItem;