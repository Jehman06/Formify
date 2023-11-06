import React from "react";
import { DropdownContext } from "../../../contexts/dropdown.context";

function DropdownList({ children, ...props }) {
    const { setOpen } = React.useContext(DropdownContext);

    return (
        <ul
            onClick={() => setOpen(false)}
            className="divide-y divide-gray-200 text-gray-700 dropdown-list"
            {...props}
        >
            {children}
        </ul>
    );
};

export default DropdownList;