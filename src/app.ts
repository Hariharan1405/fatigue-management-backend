import express from 'express';
import cors from 'cors';
import registerRoutes from './routes/registerRoutes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', registerRoutes);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fatigue Management API',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      { url: 'http://localhost:8080/api' }
    ],
  },
  // Path to files with JSDoc comments for endpoints
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve the Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;