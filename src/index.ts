import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import sketchRouter from './routes/sketch';

const app = new Koa();

app.use(bodyParser());
app.use(serve('./static'));
// app.use(async (_ctx, next) => {
//   next();
// });
app.use(sketchRouter.routes()).use(sketchRouter.allowedMethods());

app.listen(8080);
