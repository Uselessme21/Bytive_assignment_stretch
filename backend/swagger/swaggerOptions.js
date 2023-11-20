const swaggerOptions = {
    swaggerDefinition: require('./swaggerDefinition'),
    apis: ['./routes/*.js','./controllers/*.js'],
  };
  
  module.exports = swaggerOptions;
  