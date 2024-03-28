import { Book, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findBooks() {
	return prisma.book.findMany();
}

export async function getBookById(id: number) {
	return prisma.book.findUnique({
		where: { id },
	});
}

export async function create(data: Prisma.BookCreateInput): Promise<Book> {
	return prisma.book.create({
		data,
	});
}