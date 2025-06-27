const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

// rest object
const app = express();

//configure dotenv
dotenv.config();

app.use(express.json());
//routes
app.use("/api/v1/student" , require("./routes/studentsRoutes"));

// middlewares
app.use(morgan("dev"));

// routes
app.get("/test", (req, res) => {
  res.status(200).send(`<h1>Welcome</h1>`);
});

// port
const PORT = process.env.PORT || 8000;

// conditionally listen
mySqlPool.query("SELECT 1").then(() => {
  // MYSQL
  console.log('MySql DB Connected'.bgCyan.white);
  
  // listen
  app.listen(PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`.bgMagenta.white);
  });
}).catch((error) => {
  console.log(error);
  
})
