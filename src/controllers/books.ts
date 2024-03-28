
export async function fetchBooks(request: Request, response: Response) {
    const users = await getBooks();
    response.status(200).send(users);
  }
  