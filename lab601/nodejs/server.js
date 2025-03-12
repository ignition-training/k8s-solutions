import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())


const listenHost = "0.0.0.0"
const listenPort =  parseInt(process.env.LISTEN_PORT || "4574")
const greeting = process.env.GREETING || "Wotcha"

const userCookie = 'authdaemon2-user'

app.get('*', function(req, res) {
  try {
    const user = req.cookies[userCookie] || 'UnknownUser'

    res.send(`${greeting} ${user}. The current time is: ${new Date()}`)
  }
  catch (err) {
    console.error(`Error processing ${err} ${JSON.stringify(err)}`)
    res.status(503).send(`Error processing ${req.path}`)
  }
})

app.listen(listenPort, listenHost, function () {
  console.log(`Server listening on ${listenHost}:${listenPort}`)
})

