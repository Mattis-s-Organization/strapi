const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe("Product API", () => {
  /**
   * Test the GET route for fetching all products.
   */
  describe("GET /products", () => {
    it("should return a list of products", async () => {});
  });

  /**
   * Test the POST route for creating a product.
   */
  describe("POST /products", () => {
    it("should create a new product", async () => {});

    it("should not create a product without required fields", async () => {});
  });

  /**
   * Test the PUT route for updating a product.
   */
  describe("PUT /products/:id", () => {
    it("should update an existing product", async () => {});

    it("should return 404 if product is not found", async () => {});
  });

  /**
   * Test the DELETE route for deleting a product.
   */
  describe("DELETE /products/:id", () => {
    it("should delete an existing product", async () => {});

    it("should return 404 if product is not found", async () => {});
  });
});
