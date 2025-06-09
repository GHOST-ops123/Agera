import http.server
import socketserver
import socket

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print(f"\nServer running at:")
    print(f"Local: http://localhost:{PORT}")
    print(f"Network: http://{local_ip}:{PORT}")
    print("\nTo access from another device on the same network:")
    print(f"1. Make sure both devices are on the same WiFi/network")
    print(f"2. Open http://{local_ip}:{PORT} on the other device")
    print("\nPress Ctrl+C to stop the server")
    httpd.serve_forever() 