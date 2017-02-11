import * as Book from '../book/BookSchema';

const Author = `
  type Author {
    name: String
    books: [Book]
  }
`;

// we export Author and all types it depends on
// in order to make sure we don't forget to include
// a dependency
export default () => [Author, Book];
