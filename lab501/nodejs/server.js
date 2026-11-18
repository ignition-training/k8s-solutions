import express from 'express'

const app = express()

const listenHost = "0.0.0.0"
const listenPort =  4574

const userHeader = 'ignition-auth-user'

app.get('/{*splat}', function(req, res) {
  try {
    const user = req.headers[userHeader] || 'UnknownUser'

    res.send(`Hello ${user}. The current time is: ${new Date()}`)
  }
  catch (err) {
    console.error(`Error processing ${err} ${JSON.stringify(err)}`)
    res.status(503).send(`Error processing ${req.path}`)
  }
})

app.listen(listenPort, listenHost, function () {
  console.log(`Server listening on ${listenHost}:${listenPort}`)
})

