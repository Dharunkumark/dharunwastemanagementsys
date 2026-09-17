Smart Waste Management System
📌 Project Description
The Smart Waste Management System is a simple web-based application developed to manage and monitor waste bins digitally. The system helps administrators view bin details, monitor waste fill levels, and identify bins that need collection.
The application is developed using Python Flask as the backend and MySQL as the database. It is designed as a one-month college-level project to demonstrate frontend development, backend programming, and database management.
🎯 Objectives
To monitor waste bin information digitally.
To identify bins that are nearing or reaching full capacity.
To store bin and sensor data in a database.
To provide an easy-to-use web interface.
To generate alerts for full or overflowing bins.
To integrate frontend, backend, and database components.
🛠️ Technologies Used
Frontend
HTML
CSS
JavaScript
Bootstrap
Backend
Python
Flask
Database
MySQL
Development Tool
Visual Studio Code
✨ Features
♻️ Smart Waste Management System homepage
🔐 Admin login
📊 Waste management dashboard
🗑️ Add and manage smart bin details
📈 Monitor bin fill levels
🚨 Full-bin and overflow alerts
🗄️ MySQL database storage
🧑‍💻 Simple and user-friendly interface
📁 Project Structure
Smart-Waste-Management-System/
│
├── app.py
├── requirements.txt
├── README.md
│
├── templates/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── bins.html
│   └── alerts.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── database/
    └── schema.sql
⚙️ Installation and Setup
Step 1: Install Python
Make sure Python is installed on your computer.
Check the Python version:
python --version
Step 2: Open the Project
Open the Smart-Waste-Management-System folder in Visual Studio Code.
Step 3: Open Terminal
In VS Code, select Terminal → New Terminal.
Step 4: Install Flask
Run:
pip install flask mysql-connector-python
Step 5: Set Up MySQL
Open MySQL Workbench, create the project database, and run the SQL commands from database/schema.sql.
Example:
CREATE DATABASE smart_waste_management;
Step 6: Run the Application
Run the Flask application:
python app.py
Then open the local address shown by Flask in your browser.
📅 Project Duration
1 Month
🗓️ Development Plan
Week 1 – Requirements, system design, database schema, and UI wireframe.
Week 2 – Login page and Flask backend development.
Week 3 – Dashboard, bin monitoring, and alert development.
Week 4 – Testing, bug fixing, documentation, and final demonstration.
🔄 Basic System Flow
Smart Bin / Sensor → Python Flask Backend → MySQL Database → Dashboard → Alerts
📌 Conclusion
The Smart Waste Management System provides a simple digital solution for monitoring waste bins and managing collection alerts. The project combines HTML, CSS, JavaScript, Python Flask, and MySQL in a practical one-month college-level application.
