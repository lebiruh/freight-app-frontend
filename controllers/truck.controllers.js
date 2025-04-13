import moment from "moment";
import { getDbUser, getDbUserById } from "../services/auth.services.js";
import { getDbAllTrucks, getDbAvailableTrucksByType, registerDbTruck, upDateDbTruckAvailability } from "../services/truck.services.js";

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

export const getAvailableTrucksByType = async(req, res) => {

  // console.log("User role is: ", req.params)
  // console.log("logIn headers: ", req.headers)

  //Check if valid data is provided
  if (!req.params.truckType) {
    return res.status(400).json("No Truck Type Selected!");
  } 

  const truckType = req.params.truckType;

  // console.log(truckType);

  const data = await getDbAvailableTrucksByType(truckType);

  // console.log("data is: ", data);
  if (!data)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(data.length === 0) return res.status(400).json({message: "No Trucks found!"})


  // Extract the required data to be sent to the user
  const ownerId = data?.map((own) => {
    const id = own?.ownerId;    
    return id;
  })

  const owner = await getDbUserById(ownerId);

  // console.log("owner is: ", owner);

  // const ownerToSendToFrontEnd = 
  
  const fullTruckInfo = [];

  // Assuming both arrays have the same length
  for (let i = 0; i < owner.length; i++) {
    fullTruckInfo.push({ ...data[i], ...owner[i] });
  }

  // console.log(fullTruckInfo);

  return res.status(200).json(fullTruckInfo);
}

export const updateTruckAvailability = async (req, res) => {

  const truckId = req.params.truckId;

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

  const response =  await upDateDbTruckAvailability(truckId);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};