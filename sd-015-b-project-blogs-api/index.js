require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const middlewares = require('./middlewares');

const app = express();
const user = require('./routes/user');
const login = require('./routes/login');
const category = require('./routes/category');
const blogPost = require('./routes/blogPost');

app.use(bodyParser.json());

app.use('/user', user);
app.use('/login', login);
app.use('/categories', category);
app.use('/post', blogPost);

app.use(middlewares.errorHander);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

//  npx sequelize db:create / npx sequelize db:drop
//  npx sequelize db:migrate / npx sequelize db:migrate:undo:all
//  npx sequelize db:seed:all / npx sequelize db:seed:undo:all
//  http://localhost:3000/post/search?q=Melhor post do ano
