"use strict"

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const listenHost = "0.0.0.0"
const listenPort =  4574

const userCookie = 'authdaemon2-user'

app.get('*', function(req, res) {
  try {
    const user = req.cookies[userCookie] || 'UnknownUser'

    res.send(`Hello ${user}.\n The current time is: ${new Date()}`)
  }
  catch (err) {
    console.error(`Error processing ${err} ${JSON.stringify(err)}`)
    res.status(503).send(`Error processing ${req.path}`)
  }
})

app.listen(listenPort, listenHost, function () {
  console.log(`Server listening on ${listenHost}:${listenPort}`)
})

