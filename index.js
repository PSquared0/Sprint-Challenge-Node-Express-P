const express = require('express');
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const PORT = 5000;

server.use(express.json());


server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});