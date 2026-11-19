import express from 'express'

const app = express()


const listenHost = "0.0.0.0"
const listenPort =  parseInt(process.env.LISTEN_PORT || "4574")
const greeting = process.env.GREETING || "Wotcha"

const userHeader = 'ignition-auth-user'

app.get('/{*splat}', function(req, res) {
  try {
    const user = req.headers[userHeader] || 'UnknownUser'

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

