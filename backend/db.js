const mongoose = require("mongoose");

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  // Try Docker hostname first
  const mongoUriDocker = process.env.MONGO_URI_DOCKER || "mongodb://mongo:27017/tic-tac-toe";
  const mongoUriHost = process.env.MONGO_URI_HOST || "mongodb://127.0.0.1:27017/tic-tac-toe";

  // Determine which URI to use
  const mongoUri = process.env.IS_DOCKER === "true" ? mongoUriDocker : mongoUriHost;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongooseInstance) => {
        console.log(`MongoDB connected at ${mongoUri}`);
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("MongoDB connection failed:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = { connectToDatabase };
