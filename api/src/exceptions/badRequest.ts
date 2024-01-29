import { HttpException } from "exceptions/httpExceptions";

export class BadRequest extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
