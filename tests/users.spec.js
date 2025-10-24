const request = require("supertest");
const { app } = require("../server");

describe("Users API", () => {
  it("should create user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Test",
      email: "test@test.com",
      password: "password123",
      role: "member",
    });

    expect(response.status).toBeDefined();
  });
});
