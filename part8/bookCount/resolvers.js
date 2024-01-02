const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

// É um objeto, que contém os resolvedores do servidor.
const resolvers = {
  Query: {
    bookCount: async () => {
      try {
        return await Book.countDocuments();
      } catch (error) {
        throw new GraphQLError(`Error counting books: ${error.message}`);
      }
    },
    authorCount: async () => {
      try {
        return await Author.countDocuments();
      } catch (error) {
        throw new GraphQLError(`Error counting authors: ${error.message}`);
      }
    },
    allBooks: async (root, args) => {
      try {
        let query = {};
        if (args.author) {
          const foundAuthor = await Author.findOne({ name: args.author });
          query.author = foundAuthor.id;
        }
        if (args.genres) {
          query.genres = { $in: args.genres };
        }
        return await Book.find(query).populate('author');
      } catch (error) {
        throw new GraphQLError(`Error fetching books: ${error.message}`);
      }
    },
    allAuthors: async () => {
      try {
        return await Author.find({}).populate('books');
      } catch (error) {
        throw new GraphQLError(`Error fetching authors: ${error.message}`);
      }
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      try {
        const foundAuthor = await Author.findOne({ name: root.name });
        const foundBooks = await Book.find({ author: foundAuthor.id });
        return foundBooks.length;
      } catch (error) {
        throw new GraphQLError(
          `Error counting books for author: ${error.message}`,
        );
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        let foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) {
          foundAuthor = new Author({ name: args.author });
          await foundAuthor.save();
        }

        const book = new Book({ ...args, author: foundAuthor });
        await book.save();

        foundAuthor.books = foundAuthor.books.concat(book.id);
        await foundAuthor.save();

        const newBook = await Book.findById(book.id).populate('author');
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

        return newBook;
      } catch (error) {
        throw new GraphQLError(`Error adding book: ${error.message}`);
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        const author = await Author.findOne({ name: args.name });

        if (author) {
          author.born = args.setBornTo;
          await author.save();
          return author;
        }

        return null;
      } catch (error) {
        throw new GraphQLError(`Error editing author: ${error.message}`);
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        return await user.save();
      } catch (error) {
        throw new GraphQLError(`Error creating user: ${error.message}`);
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user || args.password !== 'secret') {
          throw new GraphQLError('Wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }

        const userForToken = { username: user.username, id: user._id };
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      } catch (error) {
        throw new GraphQLError(`Error during login: ${error.message}`);
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
