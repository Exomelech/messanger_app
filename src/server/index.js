const express = require("express");
const app = express();
const cors = require("cors");
const jsonParser = express.json();
app.listen(3000);
app.use(cors());

const path = require("path");
const external_api = require("./lib/external_api");

//app.use(jsonParser).use(express.static(path.join(__dirname, "../../dist")));

/*
app.get("/", function(req, res) {
  console.log("Client has connected");
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.get("*", function(req, res) {
  console.log("Client has redirected");
  res.redirect("/");
});

app.post("/auth/", jsonParser, (req, res) => {
  console.log( 'Client has request auth' );
  external_api.auth_request(req.body)
    .then( data => res.json(data) );
});
*/
app.get('/helloworld', (req, res) => {
  console.log('request')
  res.json({
    a:'i love nikita'
  })
});

app.post('/registration', jsonParser, (req, res) => {
  external_api.reg_request(req.body)
  .then( data => res.json(data) );
});

app.post('/login', jsonParser, (req, res) => {
  external_api.login_request(req.body)
  .then( data => res.json(data) );
});