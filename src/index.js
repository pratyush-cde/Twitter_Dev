const express = require("express");
const connect = require("./config/database");
const routes = require("./routes");
const { UserRepository, TweetRepository } = require("./repository/index");
const { LikeService } = require("./services/index");
const { PORT } = require("./config/serverConfig");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

async function startServer() {
  await connect();
  console.log("MongoDB connected");

  app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
