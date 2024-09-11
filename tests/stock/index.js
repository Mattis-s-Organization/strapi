const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe("Stock API", () => {
  /**
   * Test the GET route for fetching all stocks.
   */
  describe("GET /stocks", () => {
    it("should return a list of stocks", async () => {});
  });

  /**
   * Test the POST route for creating a stock.
   */
  describe("POST /stocks", () => {
    it("should create a new stock", async () => {});

    it("should not create a stock without required fields", async () => {});
  });

  /**
   * Test the PUT route for updating a stock.
   */
  describe("PUT /stocks/:id", () => {
    it("should update an existing stock", async () => {});

    it("should return 404 if stock is not found", async () => {});
  });

  /**
   * Test the DELETE route for deleting a stock.
   */
  describe("DELETE /stocks/:id", () => {
    it("should delete an existing stock", async () => {});

    it("should return 404 if stock is not found", async () => {});
  });
});
