import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";

const app = createExpressServer({
  controllers: [UserController],
  validation: true,
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
