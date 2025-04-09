import conn from "../config/db.config.js";
// import { query } from "../config/db.config.js";
import moment from "moment";

export const addDbFreightOrder = async (req, res) => {

  const q = "INSERT INTO freight (`clientId`, `type`, `weight`, `weight_unit`, `price`, `price_unit`, `start_location`, `end_location`, `status`, `createdAt`) VALUES (?)"

  const values = [
    req.body.userId,
    req.body.truck,
    req.body.weight,
    req.body.weightUnit,
    req.body.price,
    req.body.priceUnit,
    req.body.source,
    req.body.destination,
    req.body.status,
    // req.params.familyId,
    // req.body.content,
    // req.body?.image,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  try {
    const response = await conn.query(q, [values]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}

export const getDbPendingFreightOrders = async (req, res) => {

  // const familyId = req.params.familyId;

  const q = `
    SELECT * FROM freight
    ORDER BY freight.createdAt DESC
  `;

  try {
    const response = await conn.query(q);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const getDbPendingFreightOrderById = async (jobId) => {

  // const jobId = req.params;

  // console.log("Job Id is: ", jobId);
  // console.log("params is: ", req.params);

  const q = "SELECT * FROM freight WHERE freightId = ?";

  try {
    const response = await conn.query(q, [jobId]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const getDbPendingFreightOrdersBySearch = async (searchTerm) => {  

  const q = "SELECT * FROM freight WHERE start_location LIKE ? OR end_location LIKE ? LIMIT 5"

  try {
    const response = await conn.query(q, [`${searchTerm}%`, `${searchTerm}%`]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}