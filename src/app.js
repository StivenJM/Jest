import express from 'express';
import routes from './routes/index.js';

const app = express();

// Middlewares
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.use('/', routes);

export default app;