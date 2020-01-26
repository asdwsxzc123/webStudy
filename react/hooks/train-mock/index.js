const express = require("express");
const app = express();
const port = 5000;
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello express");
  res.end();
});
app.get("/rest", (req, res) => {
  return res.json({
    result: 1,
    msg: ""
  });
});
// app.post()
app.listen(port, () => {
  console.log(port);
});
