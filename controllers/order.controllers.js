import {addDbBooking, addDbFreightOrder, getDbBookingsByStatus, getDbFreightOrdersByStatus, getDbPendingFreightOrderById, getDbPendingFreightOrdersBySearch, upDateDbBookingStatus, upDateDbOrderStatus} from '../services/order.services.js'

import moment from "moment";
import { upDateDbTruckAvailability } from '../services/truck.services.js';

export const addFreightOrder = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  // console.log("Submitted order to controller is: ", req.body);

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
  

  const response =  await addDbFreightOrder(values);

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};

export const getFreightOrdersByStatus = async (req, res) => {

    const status = req.params.status;

    if(status === 'pending') {

      const response =  await getDbFreightOrdersByStatus(status);

      if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

      return res.status(200).json(response);
    }

    const response =  await getDbBookingsByStatus(status);

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

  const {id, action, truckId} = req.body;

  const bookingValues = [id, truckId, action, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]

  const order = await getDbPendingFreightOrderById(id);

  if(order.length === 0) {
    return res.status(404).json({message: "Order not found"})
  }

//   console.log("Order is: ", order);

  
  const currentStatus = order[0]?.status
  // console.log("Current status: ", currentStatus);
  // console.log("Current status: ", currentStatus);

  //Check if transation is allowed
  if(!validTransations[currentStatus] || !validTransations[currentStatus].includes(action)) {
    return res.status(400).json({message: `Invalid status transation from '${currentStatus}' to '${action}'`})
  }

  const response =  await upDateDbOrderStatus(action, id);

  if(action === 'in_transit') {
    await addDbBooking(bookingValues);
  }

  if(action === 'completed') {

    await upDateDbBookingStatus(action, id);

    // const truckId = bookingStatus.truckId;

    await upDateDbTruckAvailability(truckId);
  }

  

  if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

  return res.status(200).json(response);
};


// export const updateBookingStatus = async (req, res) => {    

//   // if (!token) return res.status(401).json("Not logged in");

//   // if (!req.body.content) return res.status(400).json("No content");
//   // console.log("added post on controller: ", req.body);

//   // console.log("Submitted order to controller is: ", req.body);

//   const validBookingTransations = {
//     'pending' : ['in_transit', 'cancelled'],
//     'in_transit': ['completed']
//   }

//   const {id, action} = req.body;

//   const order = await getDbPendingFreightOrderById(id);

//   if(order.length === 0) {
//     return res.status(404).json({message: "Order not found"})
//   }

// //   console.log("Order is: ", order);

  
//   const currentStatus = order[0]?.status
//   console.log("Current status: ", currentStatus);

//   //Check if transation is allowed
//   if(!validTransations[currentStatus] || !validTransations[currentStatus].includes(action)) {
//     return res.status(400).json({message: `Invalid status transation from '${currentStatus}' to '${action}'`})
//   }

//   const response =  await upDateDbOrderStatus(action, id);

//   if (!response)  return res.status(500).json({message: "Something went wrong. Please try again later."});

//   return res.status(200).json(response);
// };