const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Bytive Assignment',
      version: '1.0.0',
      description: 'Api to search the users on the basis of there tech skills and create your own profile and update to get noticed by other peoples.',
    },
    servers: [
      {
        url: 'https://bytive-assignment-stretch-git-main-uselessme21s-projects.vercel.app',
        description: 'API',
      },
    ],
  };
  
  module.exports = swaggerDefinition;
  