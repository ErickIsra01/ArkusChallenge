const request = require("supertest");

describe("POST /accounts", () => {
  test('200 status code', async () => {
    const response = await request(app).post("/api/v1/accounts/createAccount").send();
    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /accounts", () => {

});

describe("DELETE /accounts", () => {

});

describe("GET /accounts", () => {

});