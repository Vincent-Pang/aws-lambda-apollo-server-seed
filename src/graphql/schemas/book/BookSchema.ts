import * as Author from '../author/AuthorSchema';

const Book = `
  type Book {
    title: String
    author: Author
  }
`;

export default () => [Book, Author];
