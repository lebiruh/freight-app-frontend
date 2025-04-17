import conn from "../config/db.config.js";
// import { query } from "../config/db.config.js";


export const addDbFreightOrder = async (values) => {

  const q = "INSERT INTO freight (`clientId`, `type`, `weight`, `weight_unit`, `price`, `price_unit`, `start_location`, `end_location`, `status`, `createdAt`) VALUES (?)"

  try {
    const response = await conn.query(q, [values]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}

export const addDbBooking = async (bookingValues) => {

  
  const bookingQuery = "INSERT INTO booking (`freightId`, `truckId`, `booking_status`, `createdAt`) VALUES (?)"

  // const truckQuery = "UPDATE trucks SET `availability` = 1 - availability WHERE truckId = ?";

  // const freightQuery = 
  try {
    const response = await conn.query(bookingQuery, [bookingValues]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}

export const getDbFreightOrdersByStatus = async (status) => {

  // const familyId = req.params.familyId;

  const q = `
    SELECT * FROM freight WHERE status = ?
    ORDER BY freight.createdAt DESC
  `;

  try {
    const response = await conn.query(q, [status]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const getDbBookingsByStatus = async (status) => {

  // const familyId = req.params.familyId;

  const q = `
    SELECT b.freightId, b.truckId, b.booking_status, f.clientId AS clientId, f.type AS type, f.weight AS weight, f.weight_unit AS weight_unit, f.price AS price, f.price_unit AS price_unit, f.start_location AS start_location, f.end_location AS end_location, f.status AS status, f.createdAt AS createdAt FROM booking b JOIN freight f ON b.freightId = f.freightId WHERE b.booking_status = ?
    ORDER BY f.createdAt DESC
  `;

  try {
    const response = await conn.query(q, [status]);
    // console.log(response);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const getDbBookingsSalesData = async (status) => {

  // const familyId = req.params.familyId;
  //  f.clientId AS clientId, f.status AS status,

  // const q = `
  //   SELECT b.freightId, b.truckId, b.booking_status, f.type AS type, f.weight AS TotalWeight, f.weight_unit AS weight_unit, f.price AS price, f.price_unit AS price_unit, f.start_location AS start_location, f.end_location AS end_location, f.createdAt AS createdAt, u.name AS first_name, u.last_name AS last_name, u.phone AS phone_number, u.user_type AS user_type FROM booking b JOIN freight f ON b.freightId = f.freightId JOIN users u ON f.clientId = u.userId WHERE b.booking_status = ?
  //   ORDER BY f.createdAt DESC
  // `;
  const q = `
    SELECT
      b.freightId,
      b.truckId,
      b.booking_status,
      f.type AS type,
      f.weight AS TotalWeight,
      f.weight_unit AS weight_unit,
      f.price AS price,
      f.price_unit AS price_unit,
      f.start_location AS start_location,
      f.end_location AS end_location,
      f.createdAt AS createdAt,
      t.ownerId AS owner_id,
      client_u.name AS client_first_name,
      client_u.last_name AS client_last_name,
      client_u.phone AS client_phone_number,
      client_u.user_type AS client_user_type,
      owner_u.name AS owner_first_name,
      owner_u.last_name AS owner_last_name,
      owner_u.phone AS owner_phone_number,
      owner_u.user_type AS owner_user_type
    FROM
      booking b
    JOIN
      freight f ON b.freightId = f.freightId
    JOIN
      trucks t ON b.truckId = t.truckId
    LEFT JOIN
      users client_u ON f.clientId = client_u.userId
    LEFT JOIN
      users owner_u ON t.ownerId = owner_u.userId 
    WHERE
      b.booking_status = ?
    ORDER BY
      f.createdAt DESC
  `;

  try {
    const response = await conn.query(q, [status]);
    // console.log(response);
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

  const letters = [...new Set(searchTerm.toLowerCase())];
  
  const startLocationConditions = letters.map(letter => `start_location LIKE ?`).join(' AND ');
  const endLocationConditions = letters.map(letter => `end_location LIKE ?`).join(' AND ');

  // const values = letters.map(letter => `%${letter}%`);

  const startLocationValues = letters.map(letter => `%${letter}%`);
  const endLocationValues = letters.map(letter => `%${letter}%`);

  const values = [...startLocationValues, ...endLocationValues];

  const q = `SELECT * FROM freight WHERE ${startLocationConditions} OR ${endLocationConditions}`


  // const q = "SELECT * FROM freight WHERE start_location LIKE ? OR end_location LIKE ?"

  try {
    // const response = await conn.query(q, [`${searchTerm}%`, `${searchTerm}%`]);
    const response = await conn.query(q, values);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const upDateDbOrderStatus= async (action, id) => { 

  const q = "UPDATE freight SET status = ? WHERE freightId = ?"; 

  // const bookingQuery = "INSERT INTO booking (`freightId`, `truckId`, `booking_status`, `createdAt`) VALUES (?)"

  try {
    const response = await conn.query(q, [action, id]);

    // const bookingStatus = await conn.query(bookingQuery, [bookingValues])
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}

export const upDateDbBookingStatus= async (action, id) => { 

  const q = "UPDATE booking SET booking_status = ? WHERE freightId = ?"; 

  // const bookingQuery = "INSERT INTO booking (`freightId`, `truckId`, `booking_status`, `createdAt`) VALUES (?)"

  try {
    const response = await conn.query(q, [action, id]);

    // const bookingStatus = await conn.query(bookingQuery, [bookingValues])
    // console.log(response);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}
