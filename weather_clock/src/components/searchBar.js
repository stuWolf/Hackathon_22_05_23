import React, { useState } from "react"

export default function SearchBar() {

  const [cityName, setCityName] = useState("")

  const handleChange = (e) => {
    //e.preventDefault()
    setCityName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(cityName) // logs to the console, working
    //to include API call here?
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input 
          type="text" 
          placeholder="Search location..."
          onChange={handleChange}
          value={cityName}
          />
        <button type="submit">Go</button>
      </div>
      </form>
    </div>
  )
}
