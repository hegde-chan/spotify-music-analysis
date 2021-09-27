import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

function Login() {
  return (
    <div className='Login'>
      <a href='/auth/login'>
        <Button variant='success' className='Login-Button'> <FontAwesomeIcon icon={faSpotify} /> Log in with Spotify</Button>
      </a>
    </div>
  )
}

export default Login