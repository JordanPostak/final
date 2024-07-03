// ...This is the utils/idUtils.js file...

// Function to generate a unique ID
const generateUniqueUserId = () => {
    let uniqueId = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    uniqueId = uniqueId
      .toString(18)
      .slice(0, 5)
      .padStart(5, "0")
      .toLocaleUpperCase();
    return uniqueId;
  };

  module.exports = {
    generateUniqueUserId
};