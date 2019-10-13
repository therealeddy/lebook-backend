require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
// const server = require('http').Server(app);

mongoose.connect(process.env.APP_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started!');
});
