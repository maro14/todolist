# Todolist

A modern todo application built with the MERN stack (MongoDB, Express, React, and Node.js) that allows users to efficiently manage their tasks with a clean, intuitive interface.

## Features

* **Task Management**
  * Create new tasks with a modern modal interface
  * Mark tasks as complete/incomplete with visual feedback
  * Delete tasks with a single click
  * View all tasks in a responsive layout

* **User Interface**
  * Clean, minimalist design
  * Smooth animations and transitions
  * Responsive layout that works on mobile and desktop
  * Dark theme with custom color scheme

* **Technical Features**
  * Real-time updates with MongoDB
  * RESTful API architecture
  * Error handling and loading states
  * Environment-based configuration

## Tech Stack

### Frontend
* React 18.3.1
* Modern CSS3 with CSS Variables
* Custom animations and transitions
* Mobile-first responsive design

### Backend
* Node.js 18+
* Express 4.21.2
* MongoDB 8.9.5
* Mongoose ODM
* CORS for cross-origin requests
* Morgan for request logging

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/todolist.git
cd todolist
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# In backend directory, create .env file
MONGODB=your_mongodb_connection_string
```

4. Start the application
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm start
```

## API Endpoints

### Tasks
* `GET /todo/all` - Retrieve all todos
* `POST /todo/add` - Create a new todo
* `GET /todo/complete/:id` - Toggle todo completion status
* `DELETE /todo/delete/:id` - Remove a todo
* `PUT /todo/update/:id` - Update a todo's content

## Browser Support

* Chrome (latest)
* Firefox (latest)
* Safari (latest)
* Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.