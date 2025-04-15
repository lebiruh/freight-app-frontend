import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Define the connection parameters for the database
const dbConfig = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

export default pool;