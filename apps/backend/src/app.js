const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
  if (error) console.log(error);

  console.log("The server has started on port", server.address().port);
});
