const express = require("express");
const app = express();
const cities = require("./json/cities.json");
const query = require("./json/query.json");
const port = 5000;
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello express");
  res.end();
});
app.get("/cities", (req, res) => {
  return res.json(cities);
});
app.get("/query", (req, res) => {
  return res.json(query);
});
app.get("/search", (req, res) => {
  const { key } = req.query;
  return res.json({
    result: [
      {
        key: "芜湖",
        display: "芜湖"
      },
      {
        key: "井冈山",
        display: "井冈山"
      },
      {
        key: "铁岭",
        display: "铁岭"
      }
    ],
    searchKey: key
  });
});
// app.post()
app.listen(port, () => {
  console.log(port);
});
