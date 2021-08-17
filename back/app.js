const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/key');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.use(cookieParser());

app.get('/', function (req, res) {
  res.send('hello world');
});

app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 3410;
app.listen(3410, () => {
  console.log(`✅ Server Listening on ${port}`);
});
