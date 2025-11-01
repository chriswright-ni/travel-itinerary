from api import create_app
from flask_cors import CORS

# Creates instance of app
app = create_app()
CORS(app)

if __name__ == "__main__":
  app.run(debug=True)