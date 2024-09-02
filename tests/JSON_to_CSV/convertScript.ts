const fs = require("fs");
const path = require("path");

// Function to convert objects to CSV
function convertToCSV(objArray) {
  const headers = [
    "Handle",
    "Title",
    "Body (HTML)",
    "Vendor",
    "Product Category",
    "Type",
    "Tags",
    "Published",
    "Option1 Name",
    "Option1 Value",
    "Option1 Linked To",
    "Option2 Name",
    "Option2 Value",
    "Option2 Linked To",
    "Option3 Name",
    "Option3 Value",
    "Option3 Linked To",
    "Variant SKU",
    "Variant Grams",
    "Variant Inventory Tracker",
    "Variant Inventory Qty",
    "Variant Inventory Policy",
    "Variant Fulfillment Service",
    "Variant Price",
    "Variant Compare At Price",
    "Variant Requires Shipping",
    "Variant Taxable",
    "Variant Barcode",
    "Image Src",
    "Image Position",
    "Image Alt Text",
    "Gift Card",
    "SEO Title",
    "SEO Description",
    "Google Shopping / Google Product Category",
    "Google Shopping / Gender",
    "Google Shopping / Age Group",
    "Google Shopping / MPN",
    "Google Shopping / Condition",
    "Google Shopping / Custom Product",
    "Google Shopping / Custom Label 0",
    "Google Shopping / Custom Label 1",
    "Google Shopping / Custom Label 2",
    "Google Shopping / Custom Label 3",
    "Google Shopping / Custom Label 4",
    "brand (product.metafields.custom.brand)",
    "color (product.metafields.custom.colorway)",
    "estimatedMarketValue (product.metafields.custom.estimatedmarketvalue)",
    "links (product.metafields.custom.links)",
    "releaseDate (product.metafields.custom.releasedate)",
    "silhouette (product.metafields.custom.silhouette)",
    "Target gender (product.metafields.shopify.target-gender)",
    "Variant Image",
    "Variant Weight Unit",
    "Variant Tax Code",
    "Cost per item",
    "Included / France",
    "Price / France",
    "Compare At Price / France",
    "Included / European Union",
    "Price / European Union",
    "Compare At Price / European Union",
    "Included / International",
    "Price / International",
    "Compare At Price / International",
    "Status",
  ];

  const csvRows = [];

  // Add the headers
  csvRows.push(headers.join(";"));

  // Add each product row
  objArray.forEach((product) => {
    const row = [
      `sneaker-${product.id}`, // Handle
      product.name, // Title
      `"<div><span>${product.story}</span></div>"`, // Body (HTML)
      "My Store", // Vendor
      "Apparel & Accessories > Shoes > Sneakers", // Product Category
      "", // Type
      "", // Tags
      false, // Published
      "Title", // Option1 Name
      "Default Title", // Option1 Value
      "", // Option1 Linked To
      "", // Option2 Name
      "", // Option2 Value
      "", // Option2 Linked To
      "", // Option3 Name
      "", // Option3 Value
      "", // Option3 Linked To
      product.sku, // Variant SKU
      0.0, // Variant Grams
      "shopify", // Variant Inventory Tracker
      4, // Variant Inventory Qty
      "deny", // Variant Inventory Policy
      "manual", // Variant Fulfillment Service
      product.retailPrice.toFixed(2), // Variant Price
      "", // Variant Compare At Price
      true, // Variant Requires Shipping
      true, // Variant Taxable
      "", // Variant Barcode
      product.image.original, // Image Src
      "", // Image Position
      "", // Image Alt Text
      false, // Gift Card
      "", // SEO Title
      "", // SEO Description
      "", // Google Shopping / Google Product Category
      "", // Google Shopping / Gender
      "", // Google Shopping / Age Group
      "", // Google Shopping / MPN
      "", // Google Shopping / Condition
      "", // Google Shopping / Custom Product
      "", // Google Shopping / Custom Label 0
      "", // Google Shopping / Custom Label 1
      "", // Google Shopping / Custom Label 2
      "", // Google Shopping / Custom Label 3
      "", // Google Shopping / Custom Label 4
      product.brand, // brand (product.metafields.custom.brand)
      product.colorway, // color (product.metafields.custom.colorway)
      product.estimatedMarketValue, // estimatedMarketValue (product.metafields.custom.estimatedmarketvalue)
      JSON.stringify([
        { text: "goat", url: product.links.goat },
        { text: "stockX", url: product.links.stockX },
        { text: "flightClub", url: product.links.flightClub },
      ]), // links (product.metafields.custom.links)
      product.releaseDate, // releaseDate (product.metafields.custom.releasedate)
      product.silhouette, // silhouette (product.metafields.custom.silhouette)
      "male", // Target gender (product.metafields.shopify.target-gender)
      "", // Variant Image
      "kg", // Variant Weight Unit
      "", // Variant Tax Code
      "", // Cost per item
      true, // Included / France
      "", // Price / France
      "", // Compare At Price / France
      true, // Included / European Union
      "", // Price / European Union
      "", // Compare At Price / European Union
      true, // Included / International
      "", // Price / International
      "", // Compare At Price / International
      "active", // Status
    ];
    console.log(row);

    csvRows.push(row.join(";"));
  });

  return csvRows.join("\n");
}

// Function to write CSV file
function writeCSVFile(inputFilePath, outputFilePath) {
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Could not read file:", err);
      return;
    }

    const products = JSON.parse(data);
    const csvData = convertToCSV(products);

    fs.writeFile(outputFilePath, csvData, "utf8", (err) => {
      if (err) {
        console.error("Could not write file:", err);
        return;
      }
      console.log("CSV file has been saved.");
    });
  });
}

// Replace with your input and output file paths
const inputFilePath = "samples.json";
const outputFilePath = "formatted.csv";

// Convert and write the CSV file
writeCSVFile(inputFilePath, outputFilePath);
