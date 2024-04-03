from http.server import BaseHTTPRequestHandler, HTTPServer
from http.cookies import BaseCookie
import datetime

hostName = "0.0.0.0"
serverPort = 4574
userCookieName = 'authdaemon2-user'

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        bc = BaseCookie(self.headers['Cookie'])
        userCookie = bc.get(userCookieName)
        self.wfile.write(bytes(f"Hello {userCookie.value if userCookie else 'Unknown' }. The current time is {datetime.datetime.now()}", "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print(f"Server listening on {hostName}:{serverPort}")

    webServer.serve_forever()

