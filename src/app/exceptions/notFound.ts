import { HttpException } from "../exceptions/httpExceptions";

export class NotFound extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}
