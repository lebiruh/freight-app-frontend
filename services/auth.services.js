import conn from "../config/db.config.js"

export const registerDbClient = async (values) => {  

  const insertQuery = "INSERT INTO users (name, last_name, email, password, phone, user_type, createdAt) VALUES (?)"

  try {
    const response = await conn.query(insertQuery, [values]);

    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const registerDbTruckOwner = async (values) => {  

  const insertQuery = "INSERT INTO users (name, last_name, email, phone, user_type, createdAt) VALUES (?)"

  try {
    const response = await conn.query(insertQuery, [values]);
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const getDbUser = async (userPhoneNo) => {  

  const q = "SELECT * FROM users WHERE phone = ?"

  try {
    const response = await conn.query(q, [userPhoneNo]);
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const getDbUserById = async (userId) => {

  const q = "SELECT * FROM users WHERE userId IN (?)"

  try {
    const response = await conn.query(q, [userId]);
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  } 
};