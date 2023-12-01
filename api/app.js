import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes.js";
dotenv.config();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/isalive", (req, res) => {
  res.send("Server Working!");
});

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
