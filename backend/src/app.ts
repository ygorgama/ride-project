import express from "express";
import cors from "cors";
import routeRide from './routes/ride';
import driverRoute from './routes/drivers';

const app = express();

// Api necessary configs

app.use(express.json());
app.use(cors());

app.use("/ride", routeRide);
app.use("/driver", driverRoute);


export default app;

