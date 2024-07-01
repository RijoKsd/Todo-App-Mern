# Todo App (MERN Stack)

This is a full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, reset their password using an OTP sent to their email, and perform all CRUD operations for their todos. Users can also view pending and completed tasks, view and edit their profile.

## Features

- User Registration
- User Login
- Password Reset using OTP
- CRUD operations for Todos
- View Pending and Completed Tasks
- View and Edit User Profile
- JWT Protected Routes

## Technologies Used

- **Backend**: Express, MongoDB, JWT
- **Frontend**: React, React Bootstrap

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/RijoKsd/Todo-App-Mern.git
   cd Todo-App-Mern

 ```

2. **Install backend dependencies:**

   ```sh
     cd server
     npm install
     npm run server
    ```

3. **Install frontend dependencies:**

   ```sh
    cd client
    npm install
    npm run dev
   ```

4. **Create a `.env` file in the `server` directory and add the following environment variables:**

   ```env
   MONGO_URI=your_mongo_uri
   PORT=your_port
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   EMAIL=your_email
   PASSWORD=your_email_password
   ```


## Usage

-  **Register**: Create a new account by providing your name, email, and password.
- **Login**: Login using your email and password.
- **Reset Password**: Reset your password using the OTP sent to your email.
- CRUD operations for Todos:
  - **Create**: Add a new todo.
  - **Read**: View all todos, pending todos, and completed todos.
  - **Update**: Edit a todo.
  - **Delete**: Delete a todo.
  - **Mark as Completed**: Mark a todo as completed.
- **Profile**: View and edit your profile.


 
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Documentation

[Documentation](https://linktodocumentation)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo

Insert gif or link to demo

# Todo App (MERN Stack)

This is a full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, reset their password using an OTP sent to their email, and perform all CRUD operations for their todos. Users can also view pending and completed tasks, view and edit their profile.

## Features

- User Registration
- User Login
- Password Reset using OTP
- CRUD operations for Todos
- View Pending and Completed Tasks
- View and Edit User Profile
- JWT Protected Routes

## Technologies Used

- **Backend**: Express, MongoDB, JWT
- **Frontend**: React, React Bootstrap

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the repository:**

```sh
   git clone https://github.com/RijoKsd/Todo-App-Mern.git
   cd Todo-App-Mern
```

2. **Install backend dependencies:**
 ```bash
    cd client
    npm install
    npm run dev
```

3. **Install frontend dependencies:**

```bash
    cd client
    npm install
    npm run dev
```

4. **Create a `.env` file in the `server` directory and add the following environment variables:**

```env
   MONGO_URI=your_mongo_uri
   PORT=your_port
   CLOUD_NAME=your_cloud_name
   API_KEY=your_api_key
   API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   EMAIL=your_email
   PASSWORD=your_email_password
```


## Usage

-  **Register**: Create a new account by providing your name, email, and password.
- **Login**: Login using your email and password.
- **Reset Password**: Reset your password using the OTP sent to your email.
- CRUD operations for Todos:
  - **Create**: Add a new todo.
  - **Read**: View all todos, pending todos, and completed todos.
  - **Update**: Edit a todo.
  - **Delete**: Delete a todo.
  - **Mark as Completed**: Mark a todo as completed.
- **Profile**: View and edit your profile.
