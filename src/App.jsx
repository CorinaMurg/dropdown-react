//issues: link does not open in new tab
// add trap to the dropdown
//add skip link


import Dropdown from "./Dropdown"
import './App.css'

function App() {
 
  const dropdownName = "Your choices"
  const links = [{url: "https://www.google.com", text: "one"}, {url: "https://www.google.com", text: "two"}, {url: "https://www.google.com", text: "three"}]


  return (
  
      <div>
        <Dropdown 
          activatorText = {dropdownName}
          items = {links}/>
      </div>
  )
}

export default App
