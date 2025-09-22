const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Platform API',
      version: '1.0.0',
      description: 'API documentation for the Blog Platform backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Pfad zu den API-Routen mit JSDoc-Kommentaren
};

const swaggerSpecs = swaggerJsdoc(options);

const swaggerRouter = express.Router();

swaggerRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = { swaggerRouter };