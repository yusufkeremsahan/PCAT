# PCAT (PICVAS)

**PCAT (PICVA)** is a web application that allows users to upload images along with titles and descriptions. The project uses **MongoDB Atlas** for dynamic content management, enabling real-time updates and storage. Built with **Node.js, Express.js, EJS**, and following the **MVC design pattern**, this project allows open access for all users without any admin or authentication system.

---

## 🌟 Features

* **Image Upload**: Users can upload images with a title and description.  
* **Open Access**: Every user can view, add, edit, or delete any image post. No admin panel or user authentication is implemented.  
* **Dynamic Content**: All data is stored in MongoDB Atlas, making content updates instantly available.  
* **Responsive Design**: Simple and clean template with basic customizations using EJS.

---

## 🚀 Technologies Used

* **Programming Language**: JavaScript (Node.js)  
* **Backend Framework**: Express.js  
* **Frontend Templating**: EJS  
* **Database**: MongoDB Atlas  
* **Design Pattern**: MVC (Model-View-Controller)

---

## 🌐 Live Demo

You can try the project live here:  
👉 **[https://picvas.onrender.com](https://picvas.onrender.com)**

---

## 🛠️ Getting Started (LOCAL)

To run this project on your local machine, follow the steps below:

1. **Clone Repository:** 
2. **Install Dependencies:** npm install
3. **Configure MongoDB:** Set up a MongoDB Atlas cluster and provide the connection URI in a .env file (or directly in the database configuration).
4. **Run the Application:** npm start
5. **Open in Browser:** Visit http://localhost:3000 to access the application.

---

## 📂 Project Structure

* **models/**       : Database models (MongoDB schemas)
* **views/**        : EJS templates for pages
* **controllers/**  : Request handling and business logic
* **public/**       : Static assets (CSS, JS, images)

---

## ⚡ Notes

* No authentication or admin panel is included; all users have equal access to upload, edit, and delete image posts.
* This project serves as a web development exercise demonstrating CRUD operations with Node.js, Express, EJS, and MongoDB Atlas.
