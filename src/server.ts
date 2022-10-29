import * as http from "http";
import app from "./app";
import mongoService from "./services/mongo.service";

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

server.listen(PORT, async () => {
  await mongoService.connect();
  console.log(`Swagger UI is running on http://localhost:${PORT}/docs`);
});
