import request from "supertest";
import app from "../app.js";

// Describe tests for routes
describe('Test Express Server Endpoints', () => {
  it('should return a welcome message for the home route', async () => {
    // Make GET request to /
    const response = await request(app).get('/');
    // Verify the status code is 200
    expect(response.status).toBe(200);
    // Verify the message is correct
    expect(response.text).toBe('Welcome to the Express server!');
  });

  it('should return an about message for the about route', async () => {
    const response = await request(app).get('/about');
    expect(response.status).toBe(200);
    expect(response.text).toBe('About this server: This is a basic Express setup.');
  });
});
