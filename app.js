import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routers/userRoutes.js";
import expenseRoutes from "./routers/expenseRoutes.js";

dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json({ urlencoded: true }));
connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

/************************** user and expense routes *************************/
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", expenseRoutes);

app.listen(5000, () => {
  console.log(`server is running at port 5000`);
});
