import React, { useState, useEffect } from 'react'

function TrackAnalysis(props) {
  const [audioFeatures, setAudioFeatures] = useState(undefined)

  useEffect(() => {
    async function getAudioAnalysis(trackId) {
      const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          'Authorization': `Bearer ${props.token}`
        }
      })
      if (response.ok) {
        const json = await response.json()
        setAudioFeatures(json)
      }
    }

    props.trackId && getAudioAnalysis(props.trackId)
  },
    [props.trackId, props.token])

  function keySignature(key, mode) {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    return keys[key] + (mode === 0 ? ' minor' : ' major')
  }

  return (
    <div className='TrackAnalysis'>
      {audioFeatures &&
        <ul>
          <li><strong>Key Signature: </strong> {keySignature(audioFeatures.key, audioFeatures.mode)}</li>
          <li><strong>Acousticness (0-1 definitely acoustic): </strong> {audioFeatures.acousticness}</li>
          <li><strong>Danceability (0-1 most danceable): </strong> {audioFeatures.danceability}</li>
          <li><strong>Energy (0-1 most energy): </strong> {audioFeatures.energy}</li>
          <li><strong>Instrumentalness (0-1 no vocals): </strong> {audioFeatures.instrumentalness}</li>
          <li><strong>Liveness (0-1 performed for audience): </strong> {audioFeatures.liveness}</li>
          <li><strong>Loudness (dB): </strong> {audioFeatures.loudness}</li>
          <li><strong>Speechiness (0-1 exclusively speech): </strong> {audioFeatures.speechiness}</li>
          <li><strong>Valence (0-1 most positive): </strong>{audioFeatures.valence}</li>
        </ul>}
    </div>
  )
}

export default TrackAnalysis