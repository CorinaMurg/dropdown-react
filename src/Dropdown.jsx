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
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                    </li>
                })}
                { items.length === 0 ? <li>No items</li> : null }
            </ul>
        </div>
    )
}
export default Dropdown

// rel="noopener": By default, when you open a link in a new tab using target="_blank", 
// the new page runs on the same process as your page and has a reference to your page via 
// the window.opener object. This can lead to certain security vulnerabilities, such as "tabnabbing", 
// where the newly opened tab can potentially redirect your original page to a malicious URL. 
// rel="noopener" prevents the new page from having access to the window.opener object, blocking it 
// from manipulating the originating tab.

// rel="noreferrer": This attribute prevents the browser from sending the HTTP referrer header 
// when the user follows the link. This ensures that the destination page does not know which site 
// it was accessed from. This is particularly important when linking to pages that could be untrustworthy 
// to protect user privacy and your site's information. It also has the same effect as rel="noopener" 
// in preventing the new page from manipulating the originating page.




