# 🌟 Business Card Management Application  

![Badge](https://img.shields.io/badge/version-1.0.0-brightgreen)  
A modern web application for managing businesses and digital business cards, designed with a responsive UI and powered by SQLite.

---

## 📋 Features  

- 🔒 **User Authentication**  
  Secure login for Admin and Business roles.  

- 🏢 **Business Management**  
  Admins can manage company profiles and users.  

- 💳 **Business Card Management**  
  Create, edit, and manage digital business cards.  

- 📊 **Dashboard with Statistics**  
  An overview of businesses and cards in the system.  

- 📱 **Responsive Design**  
  Fully optimized for desktop and mobile devices.  

---

## 🛠️ Technologies Used  

| **Technology**      | **Description**                          |
|----------------------|------------------------------------------|
| **Frontend**         | React (or your frontend framework)       |
| **Backend**          | Node.js                                 |
| **Database**         | SQLite (better-sqlite3/sql.js)          |
| **Authentication**   | bcryptjs for password hashing           |
| **Styling**          | CSS/SCSS for responsive design          |

---

## 🚀 Getting Started  

### Prerequisites  

Ensure the following are installed:  

- **Node.js (v18+)**: [Download here](https://nodejs.org/)  
- **npm**: Comes bundled with Node.js  

---

### Installation

1. **Clone the Repository**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **🛠️ Set Up the Database**

    - If using **better-sqlite3**:

      ```bash
      npm run db:setup
      ```

    - If using **sql.js** (browser-compatible), no setup is needed as the database initializes in memory.

4. **🚀 Start the Development Server**

    ```bash
    npm run dev
    ```

5. **🌐 Access the Application**
    - Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

6. **Default Admin Credentials**
    - **Email**: `admin@example.com`
    - **Password**: `admin123`

---

## ⚙️ Available Scripts

Here are the available commands you can run in your terminal:

#### `npm install`
Installs all project dependencies.

#### `npm run db:setup`
Initializes the database with necessary tables and data.

#### `npm run dev`
Starts the development server.

---

## Common Issues & Troubleshooting

### Port Already in Use
If you see an error saying the port is already in use, you can change the port as follows:

    ```bash
    PORT=4000 npm run dev
    ```
### SQLite Binding Issues (If using better-sqlite3)

If you run into issues with better-sqlite3 bindings, try rebuilding the bindings:

    ```bash
    npm rebuild better-sqlite3
    ```
### Missing Dependencies

If you encounter errors related to missing dependencies, you can resolve them by reinstalling the required packages. To do so, run the following command in your terminal:

    ```bash
    npm install
    ```
---

## 🎯 Future Enhancements

#### Persistent storage for sql.js
Currently, the database is stored in memory. We plan to implement persistent storage using IndexedDB in the browser.

#### Integration with third-party analytics APIs
We may integrate with services like Google Analytics or Mixpanel to gather insights.

#### Email notifications
We plan to add email notifications for account updates and other events.

---

## 📄 License
This project is licensed under the MIT License.

---

## 💡 Contributing
We welcome contributions! Please feel free to submit a pull request or open an issue.

---

## 🧑‍💻 Author
Developed by [Chamindu Hansajith](https://github.com/Chamindu28).


