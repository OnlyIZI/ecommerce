import express from "express";
import "dotenv/config";
import { errorHandler } from "./app/middleware/errorHandler";
import cookieParser from "cookie-parser";
import { routes } from "./app/routes";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://locahost:3000", "https://ecommerce-front-self.vercel.app"],
    methods: ['POST',  'GET', 'PUT', "DELETE"],
    credentials: true,
  }),
);

app.use(routes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
