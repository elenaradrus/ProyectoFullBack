const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "cuberRelacional",
});

connection.connect((err) => {
  if (!err) {
    console.log("Connection Established Successfully");
    //connection.end();
  } else {
    console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
  }
});
module.exports=connection