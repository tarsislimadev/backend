# View engine example

```js
const { Server } = require('abackend');
const cons = require('@ladjs/consolidate');
const app = new Server();

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const users = [];
users.push({ name: 'tobi' });
users.push({ name: 'loki' });
users.push({ name: 'jane' });

app.get('/', function(req, res) {
  res.render('index', {
    title: '@ladjs/consolidate'
  });
});

app.get('/users', function(req, res) {
  res.render('users', {
    title: 'Users',
    users: users
  });
});

app.listen(3000);
console.log('Express server listening on port 3000');
```
