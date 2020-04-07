import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import demoRouter from './routes/demo';

const app = new Koa();

app.use(bodyParser());
app.use(serve('./static'));
// app.use(async (ctx, next) => {
//   next();
// });
app.use(demoRouter);
app.listen(8080);
