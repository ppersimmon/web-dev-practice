import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { AppDataSource } from "./ormconfig";

AppDataSource.initialize()
  .then(() => {
    console.log("data source was initialized");

    const app = createExpressServer({
      controllers: [UserController],
      validation: true,
    });

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error during data source initialization:", err);
  });
