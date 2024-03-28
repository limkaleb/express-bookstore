import { Response } from "express";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { create, getUserByEmail, getUserById, findUsers } from "../repositories/users";
import { generateToken } from "../utils/auth-utils";
import { UserResponse } from "../types/response";

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

export async function createUser(response: Response<UserResponse>, data: CreateUserDto): Promise<UserResponse> {
	const userExists = await getUserByEmail(data.email);

	if (userExists) {
		response.status(400);
		throw new Error('User already exists');
	}

	const newUser = await create({
		name: data.name,
		email: data.email,
		passwordDigest: data.password,
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