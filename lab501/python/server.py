from http.server import BaseHTTPRequestHandler, HTTPServer
import datetime

hostName = "0.0.0.0"
serverPort = 4574
userHeaderName = 'ignition-auth-user'

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        userHeader = self.headers.get(userHeaderName)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes(f"Hello {userHeader if userHeader else 'Unknown' }. The current time is {datetime.datetime.now()}", "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print(f"Server listening on {hostName}:{serverPort}")

    webServer.serve_forever()

