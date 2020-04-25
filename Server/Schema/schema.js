const graphql = require("graphql");
const _ = require("lodash");
let { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt , GraphQLList } = graphql;

const books = [
  { id: "1", name: "Rich Dad Poor Dad", genre: "Self Improvement", authorId: "1" },
  { id: "2", name: "Subconscious Mind", genre: "Self Improvement", authorId: "2" },
  { id: "3", name: "Harry Potter", genre: "Self Improvement", authorId: "3" },
  { id: "4", name: "The Girl", genre: "Self Improvement", authorId: "3" },
  { id: "5", name: "Half Girlfriend", genre: "Self Improvement", authorId: "2" },
  { id: "6", name: "50 Shades of Grey", genre: "Self Improvement", authorId: "3" },
];
const authors = [
  { id: "1", name: "Robert", age: 23 },
  { id: "2", name: "John Doe", age: 90 },
  { id: "2", name: "Dale", age: 35 },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
          console.log(parent)
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
        type  : new GraphQLList(BookType),
        resolve(parent , args){
            return _.filter(books , {authorId : parent.id})
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });

      },
    },
    books:{
        type:new GraphQLList(BookType),
        resolve(parent){
            return books
        }

    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    authors :{
        type: new GraphQLList(AuthorType),
        resolve(parent){
            return authors
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
