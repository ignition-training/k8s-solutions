"use strict"

import express from 'express'
import cookieParser from 'cookie-parser'
import { readFile } from 'node:fs/promises'
import os from 'os'
import * as k8s from '@kubernetes/client-node'

const app = express()
app.use(cookieParser())


const hostname = os.hostname() || 'Hostname unkown'

const listenHost = "0.0.0.0"
const listenPort =  parseInt(process.env.LISTEN_PORT || "4574")
const greetingLocation = process.env.GREETING_LOCATION || "Greeting location not set"
const namespace = process.env.NAMESPACE || "Namespace not set"

const userCookie = 'authdaemon2-user'

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)

async function getPodNames()
{
  var pods = await k8sApi.listNamespacedPod({ namespace })
 
  return pods.items.map(x => x.metadata.name)
}

app.get('*', async function(req, res) {
  try {
    const user = req.cookies[userCookie] || 'UnknownUser'

    const greeting = await readFile(greetingLocation, 'utf8')

    res.setHeader("Content-Type", "text/html")

    // This really should be done with a template of some kind
   
    let html = "<html><head></head><body>"
    html += `Hostname: ${hostname}<br>`
    html += `${greeting} ${user}.<br>`
    html += `The current time is: ${new Date()}<br>`
    html += 'Pods:<br>'
    const podNames = await getPodNames()
    for (let pn of podNames) {
      html += `  ${pn}<br>`
    }
    html += '</body></html>'


    res.send(html)
  }
  catch (err) {
    console.error(`Error processing ${err} ${JSON.stringify(err)}`)
    res.status(503).send(`Error processing ${req.path}`)
  }
})

app.listen(listenPort, listenHost, function () {
  console.log(`Server listening on ${listenHost}:${listenPort}`)
})

