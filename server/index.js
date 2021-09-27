const express = require('express')
const dotenv = require('dotenv')
const request = require('request')

const PORT = 5000

dotenv.config()

let client_id = process.env.SPOTIFY_CLIENT_ID
let client_secret = process.env.SPOTIFY_CLIENT_SECRET
global.access_token = ''

let app = express()

app.get('/auth/login', (req, res) => {
    let scope = 'streaming user-read-email user-read-private'
    let state = generateRandomString(10)
    let auth_query_params = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        state: state,
        redirect_uri: 'http://localhost:3000/auth/callback',
    })
    res.redirect('https://accounts.spotify.com/authorize?' + auth_query_params.toString())
})

app.get('/auth/callback', (req, res) =>  {
    let code = req.query.code
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:3000/auth/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    }
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            global.access_token = body.access_token
            res.redirect('/')
        }
    })
})

app.get('/auth/token', (req, res) => {
    res.json({
        access_token: global.access_token
    })
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})

function generateRandomString(length) {
    const POSSIBLE_CHARS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjkll;zxcvbnm"
    let result = ''
    for (let i = 0; i < length; i++) {
        result += POSSIBLE_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_CHARS.length))
    }
    return result
}