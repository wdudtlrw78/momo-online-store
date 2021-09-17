const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config();

// 프론트에서 json형식(axios)으로 데이터를 보냈을 때 그 json 형식의 데이터를 req.body로 넣어준다.
app.use(express.json());

// form submit을 했을 때 urlencoded방식으로 넘어온다. 그래서 form 했을 때 req.body안에 데이터 넣어준다.
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('✅ MongoDB Connected..'))
  .catch((err) => console.log(err));

const prod = process.env.NODE_ENV === 'production';

if (prod) {
  app.use(morgan('combined'));
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(cookieParser());

app.use('/api/users', require('./back/routes/users'));
app.use('/api/product', require('./back/routes/product'));

app.use('/uploads', express.static('uploads'));

if (prod) {
  app.use(express.static(path.join(__dirname, 'front/dist')));

  app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'front', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('hello world!');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server Listening on ${PORT}`);
});
