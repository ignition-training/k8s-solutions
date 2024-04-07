"use strict"

const express = require('express')
const cookieParser = require('cookie-parser')
const { readFile } = require('node:fs/promises')
const os = require('os')

const app = express()
app.use(cookieParser())


const hostname = os.hostname() || 'Hostname unkown'

const listenHost = "0.0.0.0"
const listenPort =  parseInt(process.env.LISTEN_PORT || "4574")
const greetingLocation = process.env.GREETING_LOCATION || "Greeting location not set"

const userCookie = 'authdaemon2-user'

app.get('*', async function(req, res) {
  try {
    const user = req.cookies[userCookie] || 'UnknownUser'

    const greeting = await readFile(greetingLocation, 'utf8')

    res.send(`${hostname}: ${greeting} ${user}. The current time is: ${new Date()}`)
  }
  catch (err) {
    console.error(`Error processing ${err} ${JSON.stringify(err)}`)
    res.status(503).send(`Error processing ${req.path}`)
  }
})

app.listen(listenPort, listenHost, function () {
  console.log(`Server listening on ${listenHost}:${listenPort}`)
})

