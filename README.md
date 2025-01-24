# Project Setup Guide

This guide will walk you through the steps to set up and run the project locally. The project consists of two main parts: **Backend** (PHP Laravel) and **Frontend** (Vue.js). Please follow the steps carefully to get the project up and running.
`https://drive.google.com/file/d/1YD57FFtnhnlZUN0fBx51eGSkoNnfnHBN/view?usp=sharing` video reference for setup guide
## Prerequisites

Make sure you have the following software installed on your local machine:

- **PHP** (version 8.1.20)
- **Composer** (version 2.8.2)
- **Node.js** (version 22.13.1)
- **Laravel** (version 10)

If you don't have these installed, please install them before proceeding.

## Step-by-Step Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone -b master <base_url>
```
Replace `<base_url>` with the actual URL of your repository.

## Backend Setup (PHP Laravel)



Follow the steps below to set up the backend (PHP Laravel):

a. Navigate to the Backend Folder
```bash
cd backend
```

b. Install PHP Dependencies
Run the following command to install the necessary PHP dependencies:

```bash
composer install
```

c. Configure the .env File
Create a .env file in the root directory of the backend.
Copy the contents of the .env.example file into the new .env file.
Update the database name and any other configuration according to your local environment.
For example:


```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

d. Generate Application Key
Generate the application key for your Laravel application:

```bash
php artisan key:generate
```
e. Serve the Application
Now, you can start the Laravel development server:

```bash
php artisan serve
```
## Frontend Setup (Vue.js)

Follow these steps to set up the frontend (Vue.js):

a. Navigate to the Frontend Folder
```bash
cd frontend
```
b. Install Vue.js Dependencies

```bash
npm install
```
c. Run the Frontend Development Server
Start the development server to run the frontend:

```bash
npm run dev
```

### Troubleshooting

Missing dependencies: If you encounter any issues during the installation, try running composer install or npm install again.
Database connection: Double-check your .env file to ensure that the database credentials are correct and the database exists.
Port conflicts: If ports 8000 (backend) or 3000 (frontend) are already in use, you can change the port by modifying the respective configuration files.
