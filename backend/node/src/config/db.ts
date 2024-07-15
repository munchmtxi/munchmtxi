import mysql from 'mysql2';
import config from './index';

const db = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

export default db;
