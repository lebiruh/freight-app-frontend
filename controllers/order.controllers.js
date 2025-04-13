import {addDbFreightOrder, getDbFreightOrdersByStatus, getDbPendingFreightOrderById, getDbPendingFreightOrdersBySearch, upDateDbOrderStatus} from '../services/order.services.js'

export const addFreightOrder = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

  const response =  await addDbFreightOrder(req, res);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};

export const getFreightOrdersByStatus = async (req, res) => {

    const status = req.params.status;

    const response =  await getDbFreightOrdersByStatus(status);

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

export const updateOrderStatus = async (req, res) => {    

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

  const validTransations = {
    'pending' : ['in_transit', 'cancelled'],
    'in_transit': ['completed']
  }

  const {id, action} = req.body;

  const order = await getDbPendingFreightOrderById(id);

  if(order.length === 0) {
    return res.status(404).json({message: "Item not found"})
  }

//   console.log("Order is: ", order);

  
  const currentStatus = order[0]?.status
  console.log("Current status: ", currentStatus);

  //Check if transation is allowed
  if(!validTransations[currentStatus] || !validTransations[currentStatus].includes(action)) {
    return res.status(400).json({message: `Invalid status transation from '${currentStatus}' to '${action}'`})
  }

  const response =  await upDateDbOrderStatus(action, id);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};