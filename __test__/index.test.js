//...This is the test/index.test.js file...

// Import required modules
const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const http = require('http'); // Import the http module
const app = express(); // Initialize Express application
app.use(router); // Mount the router middleware

// Create a server instance
const server = http.createServer(app);

describe('Login and Logout Routes', () => {
    test('GET /login should return status 200 in test environment', async () => {
        process.env.NODE_ENV = 'test'; // Set the environment to test
        const response = await request(app).get('/login');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Logged in successfully for testing.');
    });

    test('GET /logout should return status 200 in test environment', async () => {
        process.env.NODE_ENV = 'test'; // Set the environment to test
        const response = await request(app).get('/logout');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Logged out successfully for testing.');
    });
});

// After all tests, close the server
afterAll((done) => {
    server.close(() => {
      done();
    });
  });