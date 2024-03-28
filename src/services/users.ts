import { Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { create, getUserByEmail, getUserById, findUsers } from "../repository/users";
import { bcryptCompare, encrypt, generateToken } from "../utils/auth-utils";
import { UserResponse } from "../types/Response";
import { LoginUserRequest } from "../types/LoginUserRequest";

export async function getUsers(): Promise<UserResponse[]> {
	const users = await findUsers();
	return users.map((user) => {
		return {
			id: user.id,
			name: user.name || '',
			email: user.email,
			balance: user.balance,
		}
	})
}

export async function getUser(response: Response<UserResponse>, id: string): Promise<UserResponse> {
	const userExists = await getUserById(Number(id));

	if (!userExists) {
		response.status(404);
		throw new Error('User not found');
	}

	return {
		id: userExists.id,
		name: userExists.name || '',
		email: userExists.email,
		balance: userExists.balance,
	};
}

export function logout(response: Response) {
  response.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
}

export async function login(response: Response, data: LoginUserRequest) {
  console.log('data: ', data);
  const userExists = await getUserByEmail(data.email);
  console.log('userExists: ', userExists);

  if (userExists && (await bcryptCompare(data.password, userExists.passwordDigest))) {
    generateToken(response, userExists.id);

    return {
      id: userExists.id,
      name: userExists.name || '',
      email: userExists.email,
      balance: userExists.balance,
    };
  } else {
    response.status(401);
    throw new Error('Invalid email or password');
  }
}

export async function createUser(response: Response<UserResponse>, data: CreateUserDto): Promise<UserResponse> {
	const userExists = await getUserByEmail(data.email);

	if (userExists) {
		response.status(400);
		throw new Error('User already exists');
	}

  const hash = await encrypt(data.password);
	const newUser = await create({
		name: data.name,
		email: data.email,
		passwordDigest: hash,
		balance: 100,
	});

  if (newUser) {
		generateToken(response, newUser.id);
  } else {
		response.status(400);
		throw new Error('Invalid user data');
  }

	return {
		id: newUser.id,
		name: newUser.name || '',
		email: newUser.email,
		balance: newUser.balance,
	};
}
