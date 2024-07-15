import dotenv from 'dotenv';

dotenv.config();

const config = {
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'munchmtxi',
    password: process.env.MYSQL_PASSWORD || 'Maria2403',
    database: process.env.MYSQL_DB || 'munchmtxi_db',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

export default config;
