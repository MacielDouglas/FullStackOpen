const { ApolloServer, gql } = require('apollo-server');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const typeDefs = require('./schema');
const resolvers = require('./revolvers');

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
      } catch (error) {
        return error;
      }
    }

    return { currentUser };
  },
};

const server = new ApolloServer(serverConfig);

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
