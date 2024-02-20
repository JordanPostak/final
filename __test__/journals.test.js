//...This is the test/journals.test.js file...

// Import required modules
const request = require('supertest');
const express = require('express');
const router = require('../routes/journals'); // Update to journals router
const http = require('http');
const app = express();

// Mock the database module
jest.mock('../data/database', () => {
  return {
    getDatabase: jest.fn(() => ({
      db: jest.fn(() => ({
        collection: jest.fn(() => ({
          find: jest.fn().mockReturnThis(),
          toArray: jest.fn().mockResolvedValue([]),
        })),
      })),
    })),
  };
});

// Mount the router middleware
app.use(router);

// Create the server
const server = http.createServer(app);

describe('Journals Routes', () => {
  test('GET / should return status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

// After all tests, close the server
afterAll((done) => {
  server.close(() => {
    done();
  });
});