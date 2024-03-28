import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { LogoutResponse, UserResponse } from '../types/Response';
import { createUser, getUser, getUsers, login, logout } from '../services/users';
import { LoginUserRequest } from '../types/LoginUserRequest';

export async function fetchUsers(request: Request, response: Response) {
  const users = await getUsers();
  response.status(200).send(users);
}

export async function getUserById(request: Request<{id: string}>, response: Response<UserResponse>) {
  const user = await getUser(response, request.params.id);
  response.status(200).send(user);
}

export async function registerUser (request: Request<{}, {}, CreateUserDto>, response: Response<UserResponse>) {
  const user = await createUser(response, request.body);
  response.status(201).send(user);
};

export async function authUser (request: Request<{}, {}, LoginUserRequest>, response: Response<UserResponse>) {
  console.log('auth body: ', request.body);
  const user = await login(response, request.body);
  console.log('userr: ', user);
  response.status(200).send(user);
};

export async function logoutUser (request: Request, response: Response<LogoutResponse>) {
  logout(response);
  response.status(200).send({ message: 'Logged out successfully' });
};
