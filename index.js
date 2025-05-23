import express from "express"
import cors from 'cors';
import sanitize from 'sanitize';
import dotenv from 'dotenv';
dotenv.config();

import addOrderRoute from './routes/order.route.js';
import authRoutes from "./routes/auth.route.js";
import getOrdersByStatusRoutes from "./routes/getOrdersByStatus.route.js";
import getPendingOrderByIdRoutes from "./routes/getPendingOrderById.route.js";
import getPendingOrdersBySearchRoutes from "./routes/getPendingOrdersBySearch.route.js";
import getUserByRoleRoutes from "./routes/getUserByRole.route.js";
import registerTruckRoutes from "./routes/registerTruck.route.js";
import getAllTrucksRoutes from "./routes/getAllTrucks.route.js";
import getTrucksByTypeRoutes from "./routes/getTrucksByType.route.js";
import upDateTruckAvailabilityRoutes from "./routes/upDateTruckAvailability.route.js"
import upDateOrderStatusRoutes from "./routes/updateOrderStatus.route.js"
import getOrderSalesDataRoute from "./routes/getOrderSalesData.route.js"
import upDateBookingStatusRoute from "./routes/updateBookingStatus.route.js"



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(sanitize.middleware);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/auth', authRoutes);
app.use("/api/order", addOrderRoute);
app.use("/api/orders", getOrdersByStatusRoutes);
app.use("/api/orders/sales", getOrderSalesDataRoute);
app.use("/api/find-order", getPendingOrderByIdRoutes);
app.use("/api/find-orders/pending", getPendingOrdersBySearchRoutes);
app.use("/api/admin", getUserByRoleRoutes);
app.use("/api/register", registerTruckRoutes);
app.use("/api/trucks", getAllTrucksRoutes);
app.use("/api/available", getTrucksByTypeRoutes);
app.use("/api/update/availability", upDateTruckAvailabilityRoutes);
app.use("/api/status", upDateOrderStatusRoutes);
app.use("/api/booking", upDateBookingStatusRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});