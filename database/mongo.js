const mongoose = require("mongoose");
/* const password = process.env.mPassword;
const dblocalM = process.env.mdblocalM */
const connectionS = `mongodb://127.0.0.1:27017/test`;
/* const connectionL = process.env.projectMoviesDB */http://127.0.0.1/

mongoose
  .connect(connectionS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de datos de Mongo conectada");
  })
  .catch((err) => {
    console.error(err);
  });