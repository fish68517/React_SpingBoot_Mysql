const express = require('express');
const admin = require('./firebaseAdmin');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/session');

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter);

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
