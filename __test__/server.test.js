//...This is the test/server.test.js file...

// Import required modules
const request = require('supertest');
const http = require('http'); // Import the http module
const app = require('../server');

// Create a server instance
const server = http.createServer(app);

// Test the root route '/'
describe('GET /', () => {
  test('It should respond with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

// Test the GitHub authentication callback route '/github/callback'
describe('GET /github/callback', () => {
  test('It should redirect to the root route after authentication', async () => {
    const response = await request(app).get('/github/callback');
    expect(response.statusCode).toBe(302); // 302 is the status code for redirect
  });
});

// After all tests, close the server
afterAll((done) => {
  server.close(() => {
    done();
  });
});

