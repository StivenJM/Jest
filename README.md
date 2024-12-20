# Jest
This repository contains examples of how to use Jets to test endpoints in a web project.

## What to Test in API Endpoints

When testing API endpoints, it's important to cover a variety of scenarios to ensure that your application behaves as expected in different situations. Below are key aspects to test for each API endpoint:

### 1. HTTP Status Code
   - **Positive Test**: Ensure the expected status code is returned when the request is processed successfully (e.g., `200 OK` for a successful GET request).
   - **Negative Test**: Verify appropriate status codes when things go wrong (e.g., `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).

   Example:
   ```javascript
   expect(response.status).toBe(200);  // Ensure status code is 200
   ```

### 2. Response Body
Verify that the response body contains the expected data, whether it's JSON, text, or another format.

   Example:
   ```javascript
   expect(response.body).toHaveProperty('id');
   expect(response.body.name).toBe('John');
   ```

### 3. Response Headers
Check that the response headers are present and contain the correct values, such as Content-Type, Authorization, Cache-Control, etc.

   Example:
   ```javascript
   expect(response.headers['content-type']).toMatch(/json/);
   ```

### 4. Behavior with Invalid Input
Test how the endpoint responds when given incorrect or malformed data (e.g., missing required parameters or invalid data). It should return the correct status code (like 400 Bad Request) and an appropriate error message.

   Example:
   ```javascript
   const response = await request(app).post('/users').send({ name: '' });
   expect(response.status).toBe(400);
   expect(response.body.error).toBe('Name is required');
   ```

### 5. Authentication and Authorization
If the endpoint requires authentication or authorization, ensure it works with valid and invalid credentials. Unauthenticated users should get a `401 Unauthorized` status, and unauthorized users should receive a `403 Forbidden` status.

   Example:
   ```javascript
   const response = await request(app)
     .get('/profile')
     .set('Authorization', 'Bearer invalid-token');
   expect(response.status).toBe(401);
   ```

### 6. Response Time
Ensure the endpoint responds within a reasonable time frame, especially in production environments to avoid excessive wait times.

   Example:
   ```javascript
   const start = Date.now();
   const response = await request(app).get('/');
   expect(Date.now() - start).toBeLessThan(1000); // Ensure response is faster than 1000ms
   ```

### 7. Output Validation
Ensure the returned data is in the expected format and matches what you expect (e.g., proper JSON structure, correct types).

   Example:
   ```javascript
   expect(response.body).toEqual(expect.objectContaining({
     id: expect.any(Number),
     name: expect.any(String),
   }));
   ```

### 8. Data Persistence
If the endpoint modifies data (e.g., create, update, or delete resources), ensure that the changes are correctly persisted to the database. Typically, this requires verifying the data after performing an action (e.g., doing a GET request after a POST to check that the data was saved).

   Example:
   ```javascript
   const postResponse = await request(app).post('/users').send({ name: 'John' });
   const getResponse = await request(app).get(`/users/${postResponse.body.id}`);
   expect(getResponse.body.name).toBe('John');
   ```

### 9. Error Messages
Ensure that error messages are clear and provide enough information for the client to understand what went wrong.

   Example:
   ```javascript
   expect(response.body.error).toBe('Invalid data');
   ```

### 10. Data Type Validation
Ensure that the returned data is of the expected type (e.g., a string, number, or object).

   Example:
   ```javascript
   expect(typeof response.body.id).toBe('number');
   expect(typeof response.body.name).toBe('string');
   ```

### 11. Redirection and Cookies (if applicable)
If the endpoint redirects to another resource or sets cookies, verify that redirection and cookies are handled correctly.

   Example:
   ```javascript
   expect(response.status).toBe(302);
   expect(response.headers['location']).toBe('/new-location');
   ```

### 12. CORS Testing (if applicable)
If your application uses CORS (Cross-Origin Resource Sharing), ensure that requests from different domains work correctly (or are blocked from unauthorized domains).

   Example:
   ```javascript
   expect(response.headers['access-control-allow-origin']).toBe('*');
   ```

### 13. Edge Cases
Test how the endpoint behaves with edge cases, such as empty data, very large or very small values, incorrect types, etc.

### 14. Load Testing
While not typical for unit tests, it's useful to perform load testing to verify how the endpoint behaves under heavy traffic. Tools like Artillery, JMeter, or K6 can be used for this.

## Running Tests

To run the tests in this project, use the following command:

```bash
npm run test
```

This will run Jest and execute all the tests defined in the project.

To run the tests with more detailed output, use:

```bash
npm test -- --verbose
```

This will show detailed descriptions of each test and whether it passed or failed.

## Conclusion

By covering all of the above aspects, you can ensure that your API endpoints function correctly, handle various edge cases, and provide meaningful feedback to users and clients.
