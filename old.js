import http from "http";
//const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("we are home");
    res.end();
  } else if (req.url == "/away") {
    res.write("we are away");
    res.end();
  }
});
server.listen(3000, () => {
  console.log("listen on 3000");
});
