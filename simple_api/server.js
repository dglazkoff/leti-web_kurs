const express = require('express');
const path = require('path');
const scoreJSON = require('./score.json');
const fs = require('fs');
const cors = require('cors');

let app = express();

app.use(express.static(__dirname));

const corsOptions = {
  credentials: true,
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders:
    'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get('/users', function(req, res, next) {
  console.log('get /');
  res.json(scoreJSON.users);
});

app.post('/users', (req, res, next) => {
  console.log('post /');
  const { name, score } = req.body;
  const userJSON = scoreJSON.users.find(user => user.name === name);
  if (userJSON) {
    if (+userJSON.score < +score) {
      Object.assign(userJSON, {
        name,
        score,
      });
    }
  } else {
    scoreJSON.users.push({
      name,
      score,
    });
  }
  writeToJSON('./score.json', scoreJSON);
  res.json(scoreJSON.users);
});

function writeToJSON(url, data) {
  fs.writeFileSync(url, JSON.stringify(data, null, 4), 'utf-8', err => {
    if (err) throw err;
  });
}

app.listen(3001, err => {
  if (err) throw err;
  else console.log('Running server at port 3001!');
});
