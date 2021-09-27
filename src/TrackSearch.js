import React, { useState } from 'react'

function TrackSearch(props) {
    const [trackQuery, setTrackQuery] = useState('')

    function handleSearch(e) {
        props.handleSearchFunc(trackQuery)
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSearch}>
            <label>Search for a track by name: </label>
            <input type='text' value={trackQuery} onChange={e => { setTrackQuery(e.target.value)} }/>
            <input type='submit' value='Search'/>
        </form>
    )
}

export default TrackSearch