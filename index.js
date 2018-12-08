const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
const PORT = 5000;
const actionRouter = require("./routers/action_router");
const projectRouter = require("./routers/project_router");

server.use(express.json(), logger("tiny"), helmet(), cors());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
