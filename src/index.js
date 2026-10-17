const express = require("express");
const connect = require("./config/database");
const routes = require("./routes");

const { PORT } = require("./config/serverConfig");
const app = express();

app.use(express.json());
app.use("/api", routes);

async function startServer() {
  try {
    await connect();
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
