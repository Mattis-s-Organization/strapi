const fs = require("fs");

// Fonction pour convertir le tableau d'objets au nouveau format
function convertToNewFormat(objectsArray) {
  const result = {
    version: 2,
    data: {
      "api::product.product": {},
    },
  };

  objectsArray.forEach((obj, index) => {
    result.data["api::product.product"][index + 1] = {
      id: String(index + 1),
      name: obj.name,
      stock_quantity: 0,
      price: obj.retailPrice,
      sku: obj.sku,
      brand: obj.brand,
      color: obj.colorway,
      estimated_market_price: obj.estimatedMarketValue,
      gender: obj.gender,
      release_date: obj.releaseDate,
      release_year: obj.releaseYear,
      story: obj.story,
      silhoutte: obj.silhoutte,
      links: obj.links,
      images: obj.image,
    };
  });

  return result;
}

// Fonction pour lire un fichier JSON
function readJSONFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");

  return JSON.parse(fileContent);
}

// Fonction pour écrire dans un fichier JSON
function writeJSONFile(filePath, data) {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonString, "utf8");
}

// Fonction principale
function processJSONFiles(inputFilePath, outputFilePath) {
  // Lire le fichier JSON d'entrée
  const inputData = readJSONFile(inputFilePath);

  // Convertir les données au nouveau format
  const convertedData = convertToNewFormat(inputData);

  // Écrire les données converties dans un nouveau fichier JSON
  writeJSONFile(outputFilePath, convertedData);

  console.log(`Fichier converti écrit dans : ${outputFilePath}`);
}

// Appel de la fonction principale avec les chemins des fichiers d'entrée et de sortie
const inputFilePath = "./samples.json"; // Remplacer par le chemin de votre fichier JSON d'entrée
const outputFilePath = "formatted.json"; // Remplacer par le chemin de votre fichier JSON de sortie

processJSONFiles(inputFilePath, outputFilePath);
