import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Login from './Login'
import WebPlayback from './WebPlayback'
import TrackSearch from './TrackSearch'
import TrackPicker from './TrackPicker'
import TrackAnalysis from './TrackAnalysis';

function App() {
  // User access token
  const [token, setToken] = useState('')
  // All TrackObjects that are represented by the current search
  const [allTracks, setAllTracks] = useState([])
  // TrackObject representing current track
  const [currentTrack, setCurrentTrack] = useState(undefined)

  useEffect(() => {
    // Set access token
    async function getToken() {
      const response = await fetch('/auth/token')
      const json = await response.json()
      const token = json.access_token
      setToken(token)
    }
    getToken()
  }, [])

  async function handleSearch(search) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (response.ok) {
      let json = await response.json()
      setAllTracks(json.tracks.items)
    }
  }

  return (
    (token === '') ? <Login /> :
      <>
        <WebPlayback token={token} trackUri={currentTrack ? currentTrack.uri : ''} />
        <TrackSearch token={token} handleSearchFunc={handleSearch}/>
        <div className='PickerAndAnalysis'>
          <TrackPicker selection={allTracks} setTrackFunc={setCurrentTrack}/>
          <TrackAnalysis token={token} trackId={currentTrack ? currentTrack.id : undefined}/>
        </div>
      </>
  );
}

export default App;
