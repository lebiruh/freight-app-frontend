import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import moment from "moment";
import { getDbUser, registerDbClient, registerDbTruckOwner } from "../services/auth.services.js";

export const registerClient = async (req, res) => {

  //Check if valid data is provided
  if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.phone || !req.body.userType) {
    return res.status(400).json({message: "Please fill all the required fields!"});
  } 

  //CHECK if USER EXISTS
  const userPhone = req.body.phone;

  const data = await getDbUser(userPhone);

  if (!data)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(data.length > 0) return res.status(409).json({message: "User already exists!"});

  //CREATE NEW USER
  //Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.phone, req.body.userType, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

  const response = await registerDbClient(values);
  if (response.affectedRows === 1) {
    return res.status(200).json("User has been created.");
  }
}

export const registerTruckOwner = async (req, res) => {

  //Check if valid data is provided
  if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.userType) {
    return res.status(400).json({message: "Please fill all the required fields!"});
  } 

  //CHECK if USER EXISTS
  const userPhone = req.body.phone;

  const data = await getDbUser(userPhone);

  if (!data)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(data.length > 0) return res.status(409).json({message: "User already exists!"});

  //CREATE NEW USER
  //Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.userType, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

  const response = await registerDbTruckOwner(values);
  if (response.affectedRows === 1) {
    return res.status(200).json("User has been created.");
  }
}

export const logIn = async(req, res) => {

  // console.log("logIn body: ", req.body)
  // console.log("logIn headers: ", req.headers)

  //Check if valid data is provided
  if (!req.body.phone || !req.body.password) {
    return res.status(400).json({message: "Please fill all the required fields!"});
  } 

  //CHECK if USER EXISTS
  const userPhoneNo = req.body.phone;

  const data = await getDbUser(userPhoneNo);

  // console.log("user data is: ", data);

  if (!data)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(data.length === 0) return res.status(400).json({message: "User not found!"});


  // Check if the correct password is provided
  // const isPassword = await bcrypt.compare(req.body.password, data[0].password);

  const isPassword = req.body.password === data[0].password;

  console.log("isPassword is: ", isPassword);

  if (!isPassword) return res.status(400).json({message: "Wrong password or phone number!"});

  // Extract the required data to be sent to the user
  const {password, ...others} = data[0];

  return res.status(200).json(others);

  // Sign the cookie the be sent to the user
  // const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);


}