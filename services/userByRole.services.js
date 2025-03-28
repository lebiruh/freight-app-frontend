import conn from "../config/db.config.js"

export const getDbUserByRole = async (userRole) => {  

  const q = "SELECT `userId`, `name`, `email`, `phone`, `createdAt` FROM users WHERE user_type = ?"

  try {
    const response = await conn.query(q, [userRole]);
    // console.log(response[0]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}