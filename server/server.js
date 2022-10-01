import { ApolloServer } from "apollo-server-express";

import {readFile} from 'fs/promises'
import cors from 'cors';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { User } from './db.js';

import { resolvers } from './resolvers.js';

const PORT = 9000;
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), express.json(), expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
}));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });  
  } else {
    res.sendStatus(401);
  }
});

//using the file system to read the schema file
const typeDefs = await readFile('./schema.graphql', 'utf8');
//creating the server
const server  =  new ApolloServer({typeDefs, resolvers})
//starting the server asynchronously
await server.start();
//applying the server to the express app
server.applyMiddleware({app, path: '/graphql'});

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
