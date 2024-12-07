import eventlet  # type: ignore
eventlet.monkey_patch()
from app import create_app, socketio  # Importujemo socketio iz __init__.py

app = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0")  # SocketIO koristi svoj metod za pokretanje aplikacije
