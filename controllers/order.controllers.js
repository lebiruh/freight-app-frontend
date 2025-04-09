import {addDbFreightOrder, getDbPendingFreightOrders, getDbPendingFreightOrderById, getDbPendingFreightOrdersBySearch} from '../services/order.services.js'

export const addFreightOrder = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

  const response =  await addDbFreightOrder(req, res);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};

export const getPendingFreightOrders = async (req, res) => {

    // const userId = req.params.userId;

    const response =  await getDbPendingFreightOrders(req, res);

    if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

    return res.status(200).json(response);
  
};

export const getPendingFreightOrderById = async (req, res) => {

    const jobId = req.params.jobId;

    const response =  await getDbPendingFreightOrderById(jobId);

    if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

    return res.status(200).json(response);
  
};

export const getPendingFreightOrdersBySearch = async (req, res) => {

    const searchTerm = req.query.q;

    
    const response =  await getDbPendingFreightOrdersBySearch(searchTerm);

    if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

    return res.status(200).json(response);
  
};