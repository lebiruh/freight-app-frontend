import conn from "../config/db.config.js"

export const getDbUser = async (userPhoneNo) => {  

  const q = "SELECT * FROM users WHERE phone = ?"

  try {
    const response = await conn.query(q, [userPhoneNo]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}