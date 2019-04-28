import mongoose from 'mongoose';
import chalk from 'chalk';

const url = 'mongodb://localhost/my_database';
const db = mongoose.connection;

mongoose.connect(url, {useNewUrlParser: true});

db.once('open', () => {
  console.log(chalk.green('连接MongoDB成功'));
});

db.on('error', () => {
  console.error(chalk.red('Error in MongoDb connection: ' + error));
  mongoose.disconnect();
});

db.on('close', () => {
  console.log(chalk.red('数据库断开，重新连接数据库'));
  mongoose.connect(url, {server: { auto_reconnect: true }});
});

export default db;
