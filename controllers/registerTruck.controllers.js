import moment from "moment";
import { getDbUser } from "../services/auth.services.js";
import { getDbAllTrucks, registerDbTruck } from "../services/registerTruck.services.js";

export const registerTruck = async (req, res) => {

  //Check if valid data is provided
  if (!req.body.owner_phone_no || !req.body.driver_name || !req.body.driver_phone_no || !req.body.plate_no || !req.body.truck_type || !req.body.truck_model || !req.body.chassis_number || !req.body.engine_number || !req.body.load_amount) {
    return res.status(400).json({message: "Please fill all the required fields!"});
  } 


  //CHECK if USER EXISTS
  const userPhone = req.body.owner_phone_no;

  const ownerData = await getDbUser(userPhone);

  if (!ownerData)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(ownerData?.length === 0) return res.status(400).json({message: "Truck owner not found!"});

  const ownerId = ownerData[0].userId;

  // console.log("owner Id is: ", ownerId);

  //CREATE NEW USER
  //Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = [ownerId, req.body.plate_no, req.body.truck_type, req.body.load_amount, req.body.driver_name, req.body.driver_phone_no, req.body.truck_model, req.body.chassis_number, req.body.engine_number, req.body.region, req.body.availability, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

  const response = await registerDbTruck(values);
  if (response.affectedRows === 1) {
    return res.status(200).json("Truck has been registered.");
  }
}

export const getAllTrucks = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

  const response =  await getDbAllTrucks(req, res);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};