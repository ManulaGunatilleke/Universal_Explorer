const express = require('express');
const app = express();
const  cors = require("cors");
require("dotenv").config();
const connectToDatabase = require('./config/database');

const { authenticate } = require('./middleware/authMiddleware');


//Initializing the port number
const port = process.env.PORT || 8070;

// Connect to the database
connectToDatabase(process.env.MONGODB_URL);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

//app.use('/auth', authenticate, authRouter);

// const usersRouter = require('./routes/userRoutes');
// app.use('/users', usersRouter);


//Server Connection
app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});

module.exports = app;