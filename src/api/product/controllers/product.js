"use strict";
const { sanitizeEntity } = require("@strapi/utils");

const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOP_ACCESS_TOKEN,
});

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async findOne(ctx) {
    const entity = await super.findOne(ctx);

    entity.shopify = await shopify.product.get(
      entity.data.attributes.shopifyID
    );

    return this.sanitizeOutput(entity, ctx);
  },
}));
