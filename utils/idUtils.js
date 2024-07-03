// ...This is the utils/idUtils.js file...

// Function to generate unique id
const { v4: uuidv4 } = require('uuid');

const generateUniqueUserId = () => {
    return uuidv4();
};

module.exports = { generateUniqueUserId };