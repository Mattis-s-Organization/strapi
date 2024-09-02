const { sanitizeEntity } = require("@strapi/utils");

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  apiKey: process.env.SHOP_API_KEY,
  password: process.env.SHOP_PASSWORD,
});

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Object}
   */

  // Find Product by ID
  async findOne(ctx) {
    console.log("-------- FIND ONE PRODUCT --------");
    const { id } = ctx.params;
    const entity = await strapi.services.sneaker.findOne({ id });
    strapi.log.debug("entity", entity);

    entity.shopify = await shopify.product.get(entity.shopifyID);

    return sanitizeEntity(entity, { model: strapi.models.sneaker });
  },
};
