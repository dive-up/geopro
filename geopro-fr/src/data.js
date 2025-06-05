import csv from "csv-parser";
import fs from "node:fs";

const jsonArray = [];
const jsonFile = fs.createWriteStream("./jsonFormatData.json");

fs.createReadStream("./all_month.csv")
  .pipe(csv())
  .on("data", (data) => {
    jsonArray.push(data);
  })
  .on("end", () => {
    jsonFile.write(JSON.stringify(jsonArray), (e) => {
      console.log(e);
    });
    console.log("Data Updated");
  });
