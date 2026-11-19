import express from 'express'
import { readFile } from 'node:fs/promises'

const app = express()


const listenHost = "0.0.0.0"
const listenPort =  parseInt(process.env.LISTEN_PORT || "4574")
const greetingLocation = process.env.GREETING_LOCATION || "Greeting location not set"

const userHeader = 'ignition-auth-user'

app.get('/{*splat}', async function(req, res) {
  try {
    const user = req.headers[userHeader] || 'UnknownUser'

    const greeting = await readFile(greetingLocation, 'utf8')

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

