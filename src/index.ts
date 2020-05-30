import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import routes from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(serve('./static'));

app.use(routes.routes()).use(routes.allowedMethods());

app.listen(8080);
