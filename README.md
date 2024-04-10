# Technical Test: Project Management System

## Description
Create a web application to manage projects. The system should allow users to register, log in, and perform the following actions:

1. **User Registration:** Users can register by providing a unique username, a valid email address, and a secure password.
2. **Login:** Users can log in to the application using their email address and password.
3. **Create Projects:** Authenticated users can create new projects by providing only a name. No additional information is required when creating a project.
4. **View Projects:** Authenticated users can view a list of all existing projects, displaying only the project name.
5. **Within each project:**
   - **Create Tasks (Cards):** Authenticated users can create new tasks (or cards) associated with a project. Each task should have a title, description, and will be automatically created in the default initial state of the project.
   - **View Tasks (Cards):** Authenticated users can view all existing tasks within a project, displaying information such as title, description, and current status.
   - **Update Tasks (Cards):** Authenticated users can move tasks between the different states defined for the project. In addition to the base states ("To Do" and "Closed"), users can create specific intermediate states to organize and manage tasks within the project workflow.

## Specific Requirements
1. **User Interface:**
   - Create an intuitive user interface that allows users to interact easily with projects and tasks.
   - Implement forms for user registration, login, project and task creation, and task updates.

2. **Authentication and Authorization:**
   - Implement a session-based authentication system to allow registered users to access the system's functionalities.
   - Manage authorization to ensure that only authenticated users can create projects, manage tasks, and perform other relevant actions.

3. **Functionality:**
   - Implement the necessary logic in the backend to handle CRUD operations (Create, Read, Update, Delete) for projects and tasks.
   - Allow users to create custom intermediate states for each project.
   - Use a state management system in the frontend (e.g., Redux) to handle the state of projects and tasks efficiently.
   - Validate input fields to ensure data integrity.

4. **Task States:**
   - Define states for tasks that can be used within the workflow of each project, including base states and intermediate states as necessary.
   - Allow users to move tasks between the different states defined for the project.

## Technology Stack
**Frontend:**
- JavaScript / TypeScript
- React
- Redux (or alternative for state management)
- HTML / CSS (Material UI, Bootstrap, Tailwind CSS, etc.)

**Backend:**
- Node.js (NestJS, Express) or Python (Django, Flask)
- Database: MySQL, PostgreSQL, MongoDB, or similar
- Authentication System: Sessions
- Testing (optional)

## Platform
Deploy your application to any free platform such as Heroku, Netlify, Vercel, etc.

## Application Process
- Fork this repository.
- Create a PR with the code and the URL of your application.
