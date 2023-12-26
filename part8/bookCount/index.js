const { ApolloServer, gql } = require('apollo-server');
const { v4: uuid } = require('uuid');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const Author = require('./models/author');
const Book = require('./models/book');
const { GraphQLError } = require('graphql');
const user = require('./models/user');
// const book = require('./models/book');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
console.log('Connecting to: ', MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
  });

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821,
//   },
//   {
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
//   },
//   {
//     name: 'Sandi Metz', // birthyear not known
//     id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
//   },
// ];

// /*
//  * Spanish:
//  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
//  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
//  */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design'],
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring'],
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns'],
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design'],
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime'],
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution'],
//   },
// ];

// typeDefs, contem o esquema GraphQL
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
      title: String
      published: Int
    ): [Book]!
    allAuthors: [Author!]!
    dummy: Int
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    addAuthor(name: String!, born: Int): Author!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`;

// É um objeto, que contém os resolvedores do servidor.
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      try {
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          if (!author) {
            throw new Error(`Author ${args.author} not found.`);
          }

          const books = await Book.find({ author: author._id });
          return books;
        } else if (args.genre) {
          const booksByGenre = await Book.find({ genres: args.genre });
          return booksByGenre;
        }

        // Se nenhum autor ou gênero for fornecido, retornar todos os livros
        const allBooks = await Book.find({});
        return allBooks;
      } catch (error) {
        throw new Error(`Error fetching books: ${error.message}`);
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({});
    },
  },
  Book: {
    title: (root) => root.title || '',
    author: (root) => root.author,
    published: (root) => root.published,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    bookCount: async (root) => {
      try {
        const bookCount = await Book.countDocuments({ author: root._id });
        return bookCount;
      } catch (error) {
        throw new Error(
          `Error fetching book count for author ${root.name}: ${error.message}`,
        );
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // Validar comprimento do título
      if (args.title.length < 5) {
        throw new GraphQLError('Title must be at least 5 characters long.', {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: args,
          },
        });
      }

      // Validar comprimento do nome do autor
      if (args.author.length < 4) {
        throw new GraphQLError(
          'Author name must be at least 4 characters long.',
          {
            extensions: {
              code: 'BAD_BOOK_INPUT',
              invalidArgs: args,
            },
          },
        );
      }
      // Verifique se o autor já existe
      let author = await Author.findOne({ name: args.author });

      // Se o autor não existir, crie um novo autor
      if (!author) {
        try {
          author = new Author({ name: args.author });
          await author.save();
        } catch (error) {
          throw new GraphQLError(`Creating author failed: ${error.message}`, {
            extensions: {
              code: 'BAD_BOOK_INPUT',
              invalidArgs: args,
            },
          });
        }
      }

      // Crie o livro associando ao autor
      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_BOOK_INPUT',
            invalidArgs: args,
          },
        });
      }

      //Buscar o livro recém-criado e popular o autor
      const populatedBook = await Book.findById(book._id)
        .populate('author')
        .exec();

      return populatedBook;
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (author) {
        // findOneAndUpdate para atualizar o autor existente
        const editedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }, // Isso garante a versão atualizada do autor
        );

        return editedAuthor;
      }

      return null; // Retorne null se o autor não for encontrado
    },

    createUser: async (root, args) => {
      const user = new user();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Inicie o servidor diretamente chamando o método 'listen'
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
