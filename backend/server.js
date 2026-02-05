require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");
const { connectToDatabase } = require("./db");

const app = createApp();
const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

connectToDatabase(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
