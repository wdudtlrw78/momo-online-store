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

// static(middleware): css, js, 이미지등 정적 파일을 제공
app.use(express.static(path.join(__dirname, 'front/dist')));

// 프론트에서 json형식(axios)으로 데이터를 보냈을 때 그 json 형식의 데이터를 req.body로 넣어준다.
app.use(express.json());

// form submit을 했을 때 urlencoded방식으로 넘어온다. 그래서 form 했을 때 req.body안에 데이터 넣어준다.
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {
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
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(cookieParser());

app.use('/api/users', require('./back/routes/users'));
app.use('/api/product', require('./back/routes/product'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (prod) {
  app.get('*', (req, res, next) => {
    // sendFile: path를 읽고 내용을 클라이언트로 전송
    // path.join: 인자로 들어온 각각의 스트링을 하나의 경로로 결합
    res.sendFile(path.join(__dirname, 'front/dist', 'index.html'));
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
