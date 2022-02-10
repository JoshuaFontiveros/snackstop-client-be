const express = require("express");
const app = express();
// const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const config = require('config');
const path = require('path');
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/snackstopDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB Connected..'));

const db = config.get('mongoURI');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected..'));

app.get("/", (req, res) => {
  res.send(`Welcome to Snackstop server`);
});

const productRouter = require("./routes/products");
const saleRouter = require("./routes/sales");
const storeRouter = require("./routes/stores");
const suppliesRouter = require("./routes/supplies");
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");

app.use("/products", productRouter);
/* http://localhost:8000/products */

app.use("/sales", saleRouter);
/* http://localhost:8000/sales */

app.use("/stores", storeRouter);
/* http://localhost:8000/stores */

app.use("/supplies", suppliesRouter);
/* http://localhost:8000/supplies */

app.use("/users", userRouter);
/* http://localhost:8000/users */

app.use("/categories", categoryRouter);
/* http://localhost:8000/categories */

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }
// const PORT = process.env.PORT || 5000;
// app.listen(() => {
//   console.log(`Our app is running on port ${port}`);
// });
