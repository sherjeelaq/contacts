import { ContactInterface } from '../models'
import { Request, Response } from 'express'

export interface IVerifyRequest extends Request {
  user?: ContactInterface
}
export interface IResponse extends Response {
  sendResponse(data: any, error: any, status: number): void
}
