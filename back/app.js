const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config/key');
const hpp = require('hpp');
const helmet = require('helmet');

// 프론트에서 json형식(axios)으로 데이터를 보냈을 때 그 json 형식의 데이터를 req.body로 넣어준다.
app.use(express.json());

// form submit을 했을 때 urlencoded방식으로 넘어온다. 그래서 form 했을 때 req.body안에 데이터 넣어준다.
app.use(express.urlencoded({ extended: true }));

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

const prod = process.env.NODE.ENV === 'production';

if (prod) {
  app.use(morgan('combined')); // 배포모드일 때는 좀더 log가 자세해져서 실제 접속자 ip도 알 수 있으며 디도스나 해킹시도 할 수 있으면 차단할 수 도있다.
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev')); // 프론트에서 백엔드 요청 보낼 때 어떤 요청들 보냈는지 기록 (백엔드에서 디버깅하기 편리)
}

app.use(cors());
app.use(cookieParser());

app.get('/', function (req, res) {
  res.send('hello world');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));

if (prod) {
  app.use(express.static(path.join(__dirname, 'front/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../front', 'build', 'index.html'))
  );
}

const port = process.env.PORT || 3410;
app.listen(3410, () => {
  console.log(`✅ Server Listening on ${port}`);
});
