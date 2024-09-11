const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;

    await instance.server.mount();
    await grantPrivileges("Public", "product", [
      "find",
      "findOne",
      "create",
      "update",
      "delete",
    ]);
    await grantPrivileges("Authenticated", "product", [
      "find",
      "findOne",
      "create",
      "update",
      "delete",
    ]);
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");

  //close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database before deletion
  await strapi.db.connection.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

async function grantPrivileges(roleName, model, actions) {
  // Récupérer l'ID du rôle à partir du nom du rôle
  const role = await strapi.query("plugin::users-permissions.role").findOne({
    where: { name: roleName },
  });

  // Si le rôle est trouvé, on met à jour les permissions
  if (role) {
    const permissions = {};
    actions.forEach((action) => {
      permissions[`api::${model}.${model}`] = {
        [action]: {
          enabled: true,
        },
      };
    });

    // Mettre à jour les permissions pour le rôle
    const response = await strapi
      .query("plugin::users-permissions.role")
      .update({
        where: { id: role.id },
        data: { permissions },
      });
  }
}

module.exports = {
  setupStrapi,
  cleanupStrapi,
};
