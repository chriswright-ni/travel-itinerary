from api import create_app

# Creates instance of app
app = create_app()

if __name__ == "__main__":
  app.run(debug=True)