const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./Schema/schema");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://nikhil:nikhil123@graphqldb-coazl.mongodb.net/test?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("listening on port 4000");
});
