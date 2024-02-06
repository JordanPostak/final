//...This is the swagger.js file...

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Final Project',
        description: 'API documentation for Final Project',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: [ // Define tags used in controllers
        {
            name: 'Users',
            description: 'Operations related to Users'
        },
        {
            name: 'Inspirations',
            description: 'Operations related to Inspirations'
        },
        {
            name: 'Journals',
            description: 'Operations related to Journals'
        },
        {
            name: 'Plans',
            description: 'Operations related to Plans'
        }
    ],
    // Exclude default tags
    defaultTag: 'default' 
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