const express = require('express');
const cors = require('cors');
// 프론트(react)에서 백엔드 서버 api 접근하기 위해서 필요
const PORT = 8080;
const app = express();
const { sequelize } = require('./models');
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const serverPrefix = '/api-server';
// 프론트 url과 겹칠 수 있으므로 구분하기 위해서 서버에 /api-server 지정

// body-parse 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// route 설정
app.use(serverPrefix, indexRouter);
app.use(serverPrefix + '/user', userRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('server is open!!');
      // console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
