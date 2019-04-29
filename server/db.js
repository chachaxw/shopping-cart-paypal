import mongoose from 'mongoose';
import chalk from 'chalk';

const dbUrl = 'mongodb://localhost:27017/test';
const db = mongoose.connection;

mongoose.connect(dbUrl, {useNewUrlParser: true});

db.once('open', () => {
  console.log(chalk.green('[mongoose] 连接MongoDB成功'));
});

db.on('error', (error) => {
  console.error(chalk.red('[mongoose] Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('close', () => {
  console.log(chalk.red('[mongoose] 数据库断开，重新连接数据库'));
  mongoose.connect(dbUrl, {server: { auto_reconnect: true }});
});

export default db;
