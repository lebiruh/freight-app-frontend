import conn from "../config/db.config.js";
// import { query } from "../config/db.config.js";
// import moment from "moment";

export const registerDbTruck = async (values) => {

  const q = "INSERT INTO trucks (`ownerId`, `license_plate`, `truck_type`, `load_amount`, `driver_name`, `driver_phone_no`, `truck_model`, `chassis_number`, `engine_number`, `region`, `availability`, `createdAt`) VALUES (?)"

  try {
    const response = await conn.query(q, [values]);
    console.log(response);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}

export const getDbAllTrucks = async (req, res) => {

  // const familyId = req.params.familyId;

  const q = `
    SELECT * FROM trucks
    ORDER BY trucks.createdAt DESC
  `;

  try {
    const response = await conn.query(q);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const getDbAvailableTrucksByType = async (truckType) => { 

  const q = "SELECT * FROM trucks WHERE truck_type = ? AND availability = 1"

  try {
    const response = await conn.query(q, [truckType]);
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const upDateDbTruckAvailability= async (truckId) => { 

  const q = "UPDATE trucks SET `availability` = 1 - availability WHERE truckId = ?"; 

  // const q = "SELECT * FROM trucks WHERE truck_type = ? AND availability = true"

  try {
    const response = await conn.query(q, [truckId]);
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

