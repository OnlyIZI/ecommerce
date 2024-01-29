import express from "express";
import "dotenv/config";
import { errorHandler } from "middleware/errorHandler";
import cookieParser from "cookie-parser";
import { routes } from "routes";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
