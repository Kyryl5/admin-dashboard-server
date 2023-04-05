require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const router = require("./router/index")
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use((req, res, next) => {
  if (req.headers.origin !== undefined && req.headers.origin !== null && req.headers.origin !== '') {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`>> Server started on ${PORT} port`))
  } catch (err) {
    console.log(err)
  }
}
start()
