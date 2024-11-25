import express from "express";
import cors from "cors";
import routeRide from './routes/ride';

const app = express();

// Api necessary configs

app.use(express.json());
app.use(cors());

app.use("/ride", routeRide);


export default app;

