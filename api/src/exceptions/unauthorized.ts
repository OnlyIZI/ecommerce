import { HttpException } from "exceptions/httpExceptions";

export class Unauthorized extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}
