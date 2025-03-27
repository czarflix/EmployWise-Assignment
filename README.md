# EmployWise User Management Application

## Overview

This is a React application built with Vite that integrates with the Reqres API to perform basic user management functions. The application includes authentication, user listing with pagination, and user management (edit/delete) functionality.

## Features

### Authentication

- Login screen with email and password authentication
- Token-based authentication using the Reqres API
- Persistent login state using local storage

### User Management

- View a paginated list of users
- Search and filter users by name or email
- Edit user details (first name, last name, email)
- Delete users

### UI/UX

- Responsive design using Tailwind CSS
- Dark/Light theme support
- Clean and intuitive user interface
- Toast notifications for success and error messages

## Technologies Used

- React 18
- Vite
- React Router DOM v6
- Axios
- React Toastify
- Tailwind CSS
- Context API for state management

## Setup Instructions

1. Clone the repository (once available)

   ```
   git clone https://github.com/czarflix/EmployWise-Assignment
   cd employwise-assignment
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Build for production

   ```
   npm run build
   ```

5. Preview production build
   ```
   npm run preview
   ```

## Demo Credentials

- Email: eve.holt@reqres.in
- Password: cityslicka

## API Endpoints Used

- POST /api/login - For authentication
- GET /api/users?page=1 - For fetching users with pagination
- PUT /api/users/{id} - For updating user details
- DELETE /api/users/{id} - For deleting users

## Project Structure

- `/src/components` - React components
  - `Login.jsx` - Authentication component
  - `UserList.jsx` - User listing with pagination and search
  - `EditUser.jsx` - Form for editing user details
  - `Navbar.jsx` - Navigation component
- `/src/contexts` - React Context providers
  - `ThemeContext.jsx` - Theme management
  - `UserContext.jsx` - User state management
- `/src/App.jsx` - Main application component with routing

## Notes

- This application uses the Reqres API which is a mock API. Some operations like delete and update might not persist on the server but are simulated on the client side.
- The application implements client-side search and filtering for the user list.
- Dark/Light theme switching is implemented using React Context.

## Links

- GitHub Repository: https://github.com/czarflix/EmployWise-Assignment
- Live Demo: [Coming Soon]
