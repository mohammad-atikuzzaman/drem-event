const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoute = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewsRoutes = require('./routes/reviewRoutes');

app.use('/api/auth', authRoute)
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewsRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
