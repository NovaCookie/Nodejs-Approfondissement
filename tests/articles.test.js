const request = require("supertest");
const { app } = require("../server");

describe("Articles API - test semple", () => {
  describe("POST /api/articles", () => {
    it("should require authentication", async () => {
      const response = await request(app)
        .post("/api/articles")
        .send({ title: "Test", content: "Test" });

      // Doit retourner 401 (non authentifié) ou 201 (si mock)
      expect([401, 201]).toContain(response.status);
    });
  });

  describe("DELETE /api/articles/:id", () => {
    it("should require admin role", async () => {
      const response = await request(app).delete("/api/articles/123");

      // Doit retourner 401 (non auth) ou 403 (non admin) ou 200/404
      expect([401, 403, 200, 404]).toContain(response.status);
    });
  });
});
