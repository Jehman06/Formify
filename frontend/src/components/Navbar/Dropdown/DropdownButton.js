import React, { useContext } from 'react';
import { DropdownContext } from '../../../contexts/dropdown.context';
import '../Navbar.css'

function DropdownButton({ children, ...props }) {
    const { open, setOpen } = useContext(DropdownContext);

    const buttonClass = open ? 'dropdown-button open' : 'dropdown-button';

    function toggleOpen() {
        setOpen(!open);
    }

    return (
        <button onClick={toggleOpen} className={buttonClass} {...props}>
            {children}
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' width={15} height={15} strokeWidth={4} stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
        </button>
    );
}

export default DropdownButton;  