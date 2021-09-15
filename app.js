const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// 프론트에서 json형식(axios)으로 데이터를 보냈을 때 그 json 형식의 데이터를 req.body로 넣어준다.
app.use(express.json());

// form submit을 했을 때 urlencoded방식으로 넘어온다. 그래서 form 했을 때 req.body안에 데이터 넣어준다.
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL || 'mongodb://localhost/momo-online-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('✅ MongoDB Connected..'))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

app.use(cors());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'front/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'front', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('hello world!');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server Listening on ${PORT}`);
});
