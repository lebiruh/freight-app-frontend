
import { getDbUserByRole } from "../services/userByRole.services.js";



export const getUserByRole = async(req, res) => {

  // console.log("User role is: ", req.params)
  // console.log("logIn headers: ", req.headers)

  //Check if valid data is provided
  if (!req.params.role) {
    return res.status(400).json("User with this role not found!");
  } 

  //CHECK if USER EXISTS
  const role = req.params.role;

  const data = await getDbUserByRole(role);

  // console.log("user data is: ", data);

  if (!data)  return res.status(500).json({message: "Something went wrong. Please try again later."});
  
  if(data.length === 0) return res.status(400).json({message: "User with this role not found!"});


  // Extract the required data to be sent to the user
  // const {password, ...others} = data[0];

  return res.status(200).json(data);
}
