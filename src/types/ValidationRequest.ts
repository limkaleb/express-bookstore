import { Request } from "express";

export interface ValidationRequest extends Request {
  user: {
    id: number;
    email: string;
    name: string;
    balance: number;
  }
}
