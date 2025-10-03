const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { app } = require("../server");
const Article = require("../api/articles/articles.schema");
const User = require("../api/users/users.model");
const config = require("../config");

describe("Articles API", () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;
  let articleId;

  beforeAll(async () => {
    await mongoose.connect(config.mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Article.deleteMany({});
    await User.deleteMany({});

    const user = new User({
      name: "Test User",
      email: "user@test.com",
      password: "$2b$10$hashedpassword",
      role: "member",
    });
    await user.save();
    userId = user._id;

    const admin = new User({
      name: "Admin User",
      email: "admin@test.com",
      password: "$2b$10$hashedpassword",
      role: "admin",
    });
    await admin.save();
    adminId = admin._id;

    userToken = jwt.sign({ userId: userId.toString() }, config.secretJwtToken);
    adminToken = jwt.sign(
      { userId: adminId.toString() },
      config.secretJwtToken
    );
  });

  // Tests de validation de l'énumération du statut
  describe("Article Schema - Status Enum Validation", () => {
    it("Accepte le statut draft", async () => {
      const article = new Article({
        title: "Test Article",
        content: "Test content",
        status: "draft",
        user: userId,
      });
      const savedArticle = await article.save();
      expect(savedArticle.status).toBe("draft");
    });

    it("Accepte le statut published", async () => {
      const article = new Article({
        title: "Test Article",
        content: "Test content",
        status: "published",
        user: userId,
      });
      const savedArticle = await article.save();
      expect(savedArticle.status).toBe("published");
    });

    it("Rejette les statuts invalides", async () => {
      const article = new Article({
        title: "Test Article",
        content: "Test content",
        status: "invalid_status",
        user: userId,
      });
      await expect(article.save()).rejects.toThrow();
    });

    it("Utilise draft par défaut si non spécifié", async () => {
      const article = new Article({
        title: "Test Article",
        content: "Test content",
        user: userId,
      });
      expect(article.status).toBe("draft");
    });
  });

  // Tests de création d'article
  describe("POST /api/articles", () => {
    it("Crée un article si utilisateur connecté", async () => {
      const articleData = {
        title: "Test Article",
        content: "Test content",
        status: "draft",
      };

      const response = await request(app)
        .post("/api/articles")
        .set("x-access-token", userToken)
        .send(articleData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe("Test Article");
      expect(response.body.status).toBe("draft");
    });

    it("Retourne 401 si non authentifié", async () => {
      const response = await request(app)
        .post("/api/articles")
        .send({ title: "Test", content: "Test" });

      expect(response.status).toBe(401);
    });
  });

  // Tests de modification d'article
  describe("PUT /api/articles/:id", () => {
    beforeEach(async () => {
      const article = new Article({
        title: "Original Title",
        content: "Original content",
        status: "draft",
        user: userId,
      });
      await article.save();
      articleId = article._id;
    });

    it("Modifie l'article si utilisateur admin", async () => {
      const response = await request(app)
        .put(`/api/articles/${articleId}`)
        .set("x-access-token", adminToken)
        .send({ title: "Updated Title" });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
    });

    it("Retourne 403 si utilisateur non admin", async () => {
      const response = await request(app)
        .put(`/api/articles/${articleId}`)
        .set("x-access-token", userToken)
        .send({ title: "Updated Title" });

      expect(response.status).toBe(403);
    });
  });

  // Tests de suppression d'article
  describe("DELETE /api/articles/:id", () => {
    beforeEach(async () => {
      const article = new Article({
        title: "Article to delete",
        content: "Content",
        status: "published",
        user: userId,
      });
      await article.save();
      articleId = article._id;
    });

    it("Supprime l'article si utilisateur admin", async () => {
      const response = await request(app)
        .delete(`/api/articles/${articleId}`)
        .set("x-access-token", adminToken);

      expect(response.status).toBe(200);

      const deletedArticle = await Article.findById(articleId);
      expect(deletedArticle).toBeNull();
    });

    it("Retourne 403 si utilisateur non admin", async () => {
      const response = await request(app)
        .delete(`/api/articles/${articleId}`)
        .set("x-access-token", userToken);

      expect(response.status).toBe(403);
    });
  });

  // Test de la route publique
  describe("GET /api/articles/user/:userId/articles", () => {
    it("Retourne les articles d'un utilisateur sans authentification", async () => {
      const response = await request(app).get(
        `/api/articles/user/${userId}/articles`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("articles");
      expect(response.body.user._id).toBe(userId.toString());
    });
  });
});
