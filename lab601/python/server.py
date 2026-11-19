from http.server import BaseHTTPRequestHandler, HTTPServer
import datetime
import os

hostName = "0.0.0.0"
serverPort = int(os.environ['LISTEN_PORT']) if 'LISTEN_PORT' in os.environ else 4574
greeting = os.environ['GREETING'] if 'GREETING' in os.environ else 'Namaste'

userHeaderName = 'ignition-auth-user'

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        userHeader = self.headers.get(userHeaderName)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(bytes(f"{greeting} {userHeader if userHeader else 'Unknown' }. The current time is {datetime.datetime.now()}", "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print(f"Server listening on {hostName}:{serverPort}")

    webServer.serve_forever()

