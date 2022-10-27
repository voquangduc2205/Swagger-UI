import * as express from "express";
import * as swaggerJsdoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
  },
  // externalDocs: {
  //   description: "Github Repo"
  //   url: http://swagger.io
  // },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "auth",
      description: "Auth endpoint",
    },
    {
      name: "user",
      description: "User endpoint",
    },
  ],
};

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*/*.route.ts", "./src/models/*/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const docsRouter = express.Router();

docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default docsRouter;
