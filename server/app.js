import Koa from 'koa';
import chalk from 'chalk';
import path from 'path';
import views from 'koa-views';
import koaSession from 'koa-session';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';

import router from './router';
import db from './db';

const app = new Koa();

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = '../public';

// Koa session
const sessionConfig = {
  key: 'SESSIONID',
  maxAge: 30 * 60 * 1000,
};

app.use(bodyParser());

app.use(views(path.join(__dirname, './views'), { extension: 'pug' }));

app.use(router.routes()).use(router.allowedMethods());

// Koa static
app.use(koaStatic(path.join( __dirname,  staticPath)));

app.use(koaSession(sessionConfig, app));

app.listen(3000, () => {
  console.log(chalk.green('[koa] App is starting at port 3000'));
});
