//...This is the utils/passwordUtils.js file...

// Function to hash a password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashedPassword = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
    return hashedPassword;
}

module.exports = {
    hashPassword
};