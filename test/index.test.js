//...This is the test/index.test.js file...

// Import required modules
const request = require('supertest');
const express = require('express');
const passport = require('passport');
const router = require('../routes/index');

// Create a new Express app for testing
const app = express();
app.use('/', router);

// Mock passport middleware
jest.mock('passport', () => ({
    authenticate: jest.fn(),
}));

// Mock MongoDB initialization function
jest.mock('../data/database', () => ({
    initDb: jest.fn(),
}));

describe('Routes in index.js', () => {
    // Test the GET /login route
    describe('GET /login', () => {
        test('It should authenticate with GitHub', async () => {
            const response = await request(app).get('/login');
            console.log(response.statusCode); // Check response status code
            console.log(passport.authenticate.mock.calls); // Check what parameters authenticate was called with
            expect(passport.authenticate).toHaveBeenCalledWith('github');
            expect(response.statusCode).toBe(200); // Adjust as needed
        });
    });

    // Test the GET /logout route
    describe('GET /logout', () => {
        test('It should logout and redirect', async () => {
            // You can simulate session data and passport behavior here
            const response = await request(app).get('/logout');
            // Make assertions based on the behavior you expect
            expect(response.statusCode).toBe(200); // Adjust as needed
        });
    });

});