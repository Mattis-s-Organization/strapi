const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../helpers/strapi");

// user mock data
const mockUserData = {
  username: "tester",
  email: "tester@strapi.com",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: null,
};

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

describe("User API", () => {
  let user;
  let jwt;

  beforeAll(async () => {
    const defaultRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({}, []);

    const role = defaultRole ? defaultRole.id : null;

    /** Creates a new user an push to database */
    user = await strapi.plugins["users-permissions"].services.user.add({
      ...mockUserData,
      role,
    });

    jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });
  });

  it("should login user and return jwt token", async () => {
    await request(strapi.server.httpServer)
      .post("/api/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: mockUserData.email,
        password: mockUserData.password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });
  });

  it("should return users data for authenticated user", async () => {
    await request(strapi.server.httpServer)
      .get("/api/users/me")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body).toBeDefined();
        expect(data.body.id).toBe(user.id);
        expect(data.body.username).toBe(user.username);
        expect(data.body.email).toBe(user.email);
      });
  });

  it("should return jwt token when refreshing token", async () => {});
});
