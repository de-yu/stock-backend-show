
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';

import MarketingResolvers from '@/Marketing/resolvers';
import MarketTypeDefs from '@/Marketing/schema';
import StockResolvers from '@/Stock/resolvers';
import StockTypeDefs from '@/Stock/schema';

import MemberResolvers from '@/Member/resolvers';
import MemberTypeDefs from '@/Member/schema';

import NotesResolvers from '@/Notes/resolvers';
import NotesTypeDefs from '@/Notes/schema';

import TracingStockResolvers from '@/TracingStock/resolvers';

import StockRecordResolvers from '@/StockRecord/resolvers';
import StockRecordDefs from '@/StockRecord/schema';

import QueryTypeDefs from '@/QueryTypeDefs';



const app = express();
const resolvers = {
  Query: {
    ...MarketingResolvers.Query,
    ...StockResolvers.Query,
    ...MemberResolvers.Query,
    ...NotesResolvers.Query,
    ...StockRecordResolvers.Query
  },
  Mutation: {
    ...MemberResolvers.Mutation,
    ...TracingStockResolvers.Mutation,
    ...NotesResolvers.Mutation,
    ...StockRecordResolvers.Mutation
  }
};

const typeDefs  = [MarketTypeDefs , StockTypeDefs , QueryTypeDefs, MemberTypeDefs, NotesTypeDefs, StockRecordDefs];


const server = new ApolloServer({ typeDefs, resolvers ,  plugins: [responseCachePlugin({
  sessionId: (requestContext: any) => {
    return (requestContext.request.http.headers.get('sessionid') || null)},
})],
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  }
});

server.applyMiddleware({ app, path: '/' });

app.listen(4000, () => {
  console.log('run in localhost:4000');
})
