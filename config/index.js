const dotenv = require("dotenv");

dotenv.config();

const { NODE_ENV, MONGO_URI_DEV, MONGO_URI_PROD } = process.env;

const isProduction = NODE_ENV === "production";

const PORT = process.env.PORT || 3000;

const MONGO_URI = isProduction ? MONGO_URI_PROD : MONGO_URI_DEV;

if (!MONGO_URI) {
  console.log(`[MongoDB] Missing connection string for MongoDB in ${NODE_ENV}`);
  process.exit(1);
}

module.exports = {
  PORT: PORT,
  MONGO_URI: MONGO_URI,
};
