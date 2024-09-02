const fs = require("fs");
const path = require("path");

function flattenObject(ob, prefix = "", sep = "_") {
  let flattened = {};
  let index = 1;

  for (let key in ob) {
    if (ob.hasOwnProperty(key)) {
      let newKey = prefix
        ? `${prefix}${sep}${index}_${key}`
        : `${index}_${key}`;
      if (
        typeof ob[key] === "object" &&
        !Array.isArray(ob[key]) &&
        ob[key] !== null
      ) {
        Object.assign(
          flattened,
          flattenObject(ob[key], `${prefix}${index}`, sep)
        );
      } else {
        flattened[newKey] = ob[key];
      }
      index++;
    }
  }
  return flattened;
}

function getAllKeys(dataArray) {
  let keys = new Set();
  dataArray.forEach((data) => {
    Object.keys(data).forEach((key) => keys.add(key));
  });
  return Array.from(keys);
}

function jsonToCsv(jsonFile, csvFile) {
  const jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

  // Flatten the JSON data
  const flatDataArray = jsonData.map((obj) => flattenObject(obj));

  // Get a consistent set of headers
  const headers = getAllKeys(flatDataArray);

  // Convert the flattened objects to a CSV string
  const csv = [
    headers.join(","), // header row
    ...flatDataArray.map((flatData) =>
      headers.map((header) => `"${flatData[header] || ""}"`).join(",")
    ),
  ].join("\n");

  // Write the CSV string to a file
  fs.writeFileSync(csvFile, csv, "utf8");
  console.log(`Data successfully exported to ${csvFile}`);
}

const inputJson = "./samples.json";
const outputCsv = "./flattened.csv";

jsonToCsv(inputJson, outputCsv);
