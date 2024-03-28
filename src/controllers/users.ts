import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UserResponse } from '../types/response';
import { PrismaClient } from '@prisma/client';
import { createUser, getUser, getUsers } from '../services/users';

const prisma = new PrismaClient();

export async function fetchUsers(request: Request, response: Response) {
  const users = await getUsers();
  response.send(users);
}

export async function getUserById(request: Request<{}, {}, {}, { id: string }>, response: Response<UserResponse>) {
  const user = await getUser(response, request.query.id);
  response.send(user);
}

export async function registerUser (request: Request<{}, {}, CreateUserDto>, response: Response<UserResponse>) {
  const user = await createUser(response, request.body);
  response.status(201).send(user);
};

// export async function authUser (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (user && (await bcryptCompare(password, user.passwordDigest))) {
//     generateToken(res, user.id);

//     res.json({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// };