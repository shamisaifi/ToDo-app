import connectToDo from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectToDo()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
    process.exit(1);
  });
