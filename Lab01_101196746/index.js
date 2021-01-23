const csv = require("csv-parser");
const fs = require("fs");
const results = [];

paths = ["./usa.txt", "./canada.txt"];
for (let p of paths) {
  if (fs.existsSync(p)) fs.unlinkSync(p);
  fs.writeFileSync(p, "country,year,population\n");
}

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (d) => {
    if (d.country === "United States" || d.country === "Canada") {
      results.push(d);
    }
  })
  .on("end", () => {
    for (let d of results) {
      if (d.country === "Canada") {
        fs.appendFileSync(paths[1], `${d.country},${d.year},${d.population}\n`);
      } else {
        fs.appendFileSync(paths[0], `${d.country},${d.year},${d.population}\n`);
      }
    }
  });
