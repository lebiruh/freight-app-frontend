import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { getDbUser } from "../services/auth.services.js";



export const logIn = async(req, res) => {

  // console.log("logIn body: ", req.body)
  // console.log("logIn headers: ", req.headers)

  //Check if valid data is provided
  if (!req.body.phone || !req.body.password) {
    return res.status(400).json("Please fill all the required fields!");
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