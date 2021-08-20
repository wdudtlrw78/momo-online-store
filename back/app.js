const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config/key');

app.use(cors());

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

// 프론트에서 백엔드 요청 보낼 때 어떤 요청들 보냈는지 기록 (백엔드에서 디버깅)
app.use(morgan('dev'));

app.use(cookieParser());

app.get('/', function (req, res) {
  res.send('hello world');
});

app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 3410;
app.listen(3410, () => {
  console.log(`✅ Server Listening on ${port}`);
});
