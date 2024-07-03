// ...This is the utils/idUtils.js file...

const generateUniqueUserId = () => {
    // Generate a unique user ID based on the current time and random values
    const timestamp = Date.now().toString(36); // Convert current time to base-36
    const randomValue = Math.random().toString(36).slice(2, 11); // Generate a random base-36 string
    return `${timestamp}-${randomValue}`;
};

// Example usage
console.log(generateUniqueUserId());