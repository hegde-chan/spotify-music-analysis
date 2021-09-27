import React, { useState, useEffect } from "react"

function WebPlayback(props) {
  const [myPlayer, setMyPlayer] = useState(undefined)
  const [deviceId, setDeviceId] = useState(-1)

  useEffect(() => {
    if (!myPlayer) {
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true
      document.body.appendChild(script)
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(props.token) },
          volume: 1.0
        })
        setMyPlayer(player)
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID: ', device_id)
          setDeviceId(device_id)
        })
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID ', device_id, ' has gone offline')
        })
        player.addListener('playback_error', ({ error }) => {
          console.log('playback error: ', error)
        })
        player.connect()
      }
    }
    return function cleanup() {
      if (myPlayer) {
        console.log('disconnecting player')
        myPlayer.disconnect()
      }
    }
  }, [myPlayer, props.token])

  useEffect(() => {
    async function changeTrack(spotify_uri) {
      let response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + props.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({uris: [spotify_uri]})
        }
      )
    }

    if (deviceId !== -1 && props.trackUri) {
      changeTrack(props.trackUri)
    }
  }, [deviceId, props.token, props.trackUri])

  return (
    <>
      <div className="container">
        <div className="main-wrapper">

        </div>
      </div>
    </>
  )
}

export default WebPlayback