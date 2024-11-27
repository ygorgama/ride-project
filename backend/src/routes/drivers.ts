import { Router } from "express";
import { DriverController } from "../controllers/DriversController";

const router = Router();
const driverController = new DriverController();

router.get("/index", driverController.index);


export default router;
