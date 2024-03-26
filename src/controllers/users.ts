import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { User } from '../types/response';

export function getUsers(request: Request, response: Response) {
  response.send([]);
}

export function getUserById(request: Request, response: Response) {
  response.send({});
}

export function createUser(request: Request<{}, {}, CreateUserDto>, response: Response<User>) {
  response.status(201).send({
    id: 1,
    username: 'test',
    email: '',
  })
}
