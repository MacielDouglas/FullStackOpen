const { ApolloServer, gql } = require('apollo-server');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Encerrar o processo em caso de falha na conexão
  });

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
    userFavoriteGenre: String
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
    me: (root, args, context) => {
      return context.currentUser;
    },
    userFavoriteGenre: (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }
      return context.currentUser.favoriteGenre;
    },
  },
  Book: {
    author: async (root) => {
      try {
        // Certifique-se de que o livro tenha o campo 'author'
        if (root.author) {
          // Recupere o autor associado ao livro
          const author = await Author.findById(root.author);
          return author;
        }
        return null; // Retorna null se o livro não tiver um autor
      } catch (error) {
        throw new Error(`Error fetching author: ${error.message}`);
      }
    },
    title: (root) => root.title || '',
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
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }
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

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User not authenticated', {
          extensions: {
            code: 'UNAUTHORIZED',
          },
        });
      }
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
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log(user);

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const serverConfig = {
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    let currentUser = null;

    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET,
        );
        currentUser = User.findById(decodedToken.id);

        // console.log('Decoded Token:', decodedToken);
        // console.log('Current User:', currentUser);
      } catch (error) {
        // console.error('Error decoding token:', error);
        return error;
        // Se o token não for válido, não define currentUser
      }
    }

    return { currentUser };
  },
};

const server = new ApolloServer(serverConfig);

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
