# Welcome to my Inventory CRUD Application for Supra Coders Z-Prefix Admissions Summer 2023
This application was made with a react frontend, python backend, and Mongo DB database.

# Backend
- Change directories into the backend folder by running `cd backend`.
- Run `python -m virtualenv venv` to create a Python virtual environment called venv. This will create a folder with the same name in the backend directory.
- Activate the venv virtual environment.
   - On MacOS and Linux systems, run `source venv/bin/activate`
   - On Windows Command Prompt, run venv\Scripts\activate.bat
- Run `pip install -r requirements.txt` to install all Python dependencies. Due to a bug in the way the `bson` and `flask_pymongo` libraries are written, you may get `bson` import errors. If this happens you will need to uninstall and reinstall in the following order.
    - pip uninstall bson
    - pip uninstall flask_pymongo
    - pip install flask_pymongo
- Ensure MongoDB Community Edition is active.
    - Windows: Run MongoDB Community Edition as a Windows Service
    - MacOS: Run MongoDB Community Edition
    - Linux: Depends on Linux distribution

# Frontend
- Run `npm install` to install all Node.js dependencies for the React frontend.
-- For a complete list of dependencies, refer to the package.json file in the project root directory
- Run `npm start` to run the frontend

# Demo Video
Assignment Walkthrough with Rubric 
https://youtu.be/7Joiu2jhoUU
