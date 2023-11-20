const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Bytive',
      version: '1.0.0',
      description: 'user search',
    },
    servers: [
      {
        url: 'http://localhost:8090',
        description: 'Local development server',
      },
    ],
  };
  
  module.exports = swaggerDefinition;
  