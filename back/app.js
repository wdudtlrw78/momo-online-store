const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/key');

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('✅ MongoDB Connected..'))
  .catch((err) => console.log(err));

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(3410, () => {
  console.log('✅ 서버 실행 중!');
});
