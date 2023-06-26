/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react"


const Dropdown = ({ activatorText = 'Dropdown', items = [] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const activatorRef = useRef(null)
    const dropdownListRef = useRef(null)

    const keyHandler = (event) => {
        if (event.key === 'Escape' && isOpen) {
            
            setIsOpen(false)
            activatorRef.current.focus()
        }
    }
    function clickHandler() {
        setIsOpen(prevState => !prevState)
    }

    const clickOutsideHandler = (event) => {
        if (dropdownListRef.current.contains(event.target) || activatorRef.current.contains(event.target)) {
            return
        }
        setIsOpen(false)
    }
    
    useEffect(() => {
        if (isOpen) {
            dropdownListRef.current.querySelector('a').focus()

            document.addEventListener('mousedown', clickOutsideHandler)

        } else {
            document.removeEventListener('mousedown', clickOutsideHandler)
        }

    }, [isOpen])

    return (
        <div
            className="dropdown-wrap"
            onKeyUp={keyHandler}
        >
            <button
                aria-haspopup="true"
                aria-controls="dropdown1"
                onClick={clickHandler}
                className="dropdown-activator"
                ref={activatorRef}
            >
                {activatorText}
            </button>
            <ul
                id="dropdown1"
                ref={dropdownListRef}
                tabIndex="0"
                className={`dropdown-itemList ${isOpen ? 'active' : ''}`}
                role="list">
                { items.map((item, index) => {
                    return <li key={index} role="listitem">
                        <a href={item.url}>{item.text}</a>
                    </li>
                })}
                { items.length === 0 ? <li>No items</li> : null }
            </ul>
        </div>
    )
}
export default Dropdown