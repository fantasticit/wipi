const Koa = require('koa');
const app = new Koa();

app.config = require('./config');
app.model = require('./models');
app.service = require('./service')(app.config);
app.controller = require('./controllers')(app);

const withConnect = require('./connection');
const withMiddleware = require('./middlewares');
const withRouter = require('./router');

withConnect(app)('mongodb');
withMiddleware(app);
withRouter(app);

app.listen(app.config.port, () => {
  console.log(`Server is running at http://localhost:${app.config.port}`)
});
