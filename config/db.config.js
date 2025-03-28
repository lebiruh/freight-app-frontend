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

// Create an async function to execute the sql queries
// export const query = async (sql, params) => {
//   const [rows] = await pool.execute(sql, params);
//   return rows;
// }

export default pool;