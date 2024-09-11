const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");
require("./user");
require("./product");
require("./order");
require("./stock");

describe("Strapi is defined", () => {
  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await cleanupStrapi();
  });

  it("should strapi server correctly defined", () => {
    expect(strapi).toBeDefined();
  });
});
