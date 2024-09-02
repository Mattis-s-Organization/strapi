require("dotenv").config();
const Shopify = require("shopify-api-node");

const shopify = new Shopify({
  shopName: process.env.SHOP_NAME,
  accessToken: process.env.SHOP_ACCESS_TOKEN,
  //   apiKey: process.env.SHOP_API_KEY,
  //   password: process.env.SHOP_PASSWORD,
});

const fetchElement = async () => {
  const response = await shopify.product.get("9435967783259");
  console.log(response);
};

fetchElement();

// console.log(shopify);
