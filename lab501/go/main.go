package main

import (
  "io"
  "net/http"
  "fmt"
  "time"
)

const portNumber = 4574
const host = "0.0.0.0"
const userHeaderName = "ignition-auth-user"

func serve(res http.ResponseWriter, req *http.Request) {
  userHeader := req.Header.Get(userHeaderName)

  var userName string
  if (userHeader == "") {
    userName = "Unknown"
  } else {
    userName = userHeader
  }

  io.WriteString(res, fmt.Sprintf("Hello %s. The current time is: %s", userName, time.Now().Format(time.RFC850)))
}

func main() {
  http.HandleFunc("/", serve)

  fmt.Println(fmt.Sprintf("Listening on %s:%d", host, portNumber))
  http.ListenAndServe(fmt.Sprintf("%s:%d", host, portNumber), nil)
}
