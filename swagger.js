//...This is the swagger.js file...

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Final Project',
        description: 'API documentation for Final Project',
        version: '1.0.0'
    },
    host: 'seerstoneapi.onrender.com',
    basePath: '/',
    schemes: ['https'],
    paths: {
    }
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js', 
    './routes/users.js', 
    './routes/inspirations.js', 
    './routes/journals.js', 
    './routes/plans.js'
];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);