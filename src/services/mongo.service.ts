import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("disconnected", (err) => {
  console.log("MongoDB disconnected");
});

async function connect() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) throw new Error("Mongo url is undefined");
  await mongoose.connect(MONGO_URL);
}

async function disconnect() {
  await mongoose.disconnect();
}

const mongoService = {
  connect,
  disconnect,
};

export default mongoService;
