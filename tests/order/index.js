const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe("Order API", () => {
  /**
   * Test the GET route for fetching all orders.
   */
  describe("GET /orders", () => {
    it("should return a list of orders", async () => {});
  });

  /**
   * Test the POST route for creating a order.
   */
  describe("POST /orders", () => {
    it("should create a new order", async () => {});

    it("should not create a order without required fields", async () => {});
  });

  /**
   * Test the PUT route for updating a order.
   */
  describe("PUT /orders/:id", () => {
    it("should update an existing order", async () => {});

    it("should return 404 if order is not found", async () => {});
  });

  /**
   * Test the DELETE route for deleting a order.
   */
  describe("DELETE /orders/:id", () => {
    it("should delete an existing order", async () => {});

    it("should return 404 if order is not found", async () => {});
  });
});
