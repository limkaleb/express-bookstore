import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserDto } from "../dtos/CreateUser.dto";

const prisma = new PrismaClient();

export async function findUsers() {
	return prisma.user.findMany();
}

export async function getUserById(id: number) {
	return prisma.user.findUnique({
		where: { id },
	});
}

export async function getUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
	});
}

export async function create(data: Prisma.UserCreateInput): Promise<User> {
	return prisma.user.create({
		data,
	});
}
