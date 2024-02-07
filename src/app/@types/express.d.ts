import { IPayload } from "../middleware/Auth";

declare global {
  namespace Express {
    export interface Request {
      payload: IPayload;
    }
  }
}
