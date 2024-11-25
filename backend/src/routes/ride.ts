import { Router } from "express";
import { RideController } from "../controllers/RideController";
import {body} from "express-validator"
import { RouteCalculationService } from "../services/RouteCalculationService";

const router = Router();
const rideController = new RideController(new RouteCalculationService());

router.post("/estimate", 
	[
		body("customer_id").notEmpty().withMessage("An error ocurred on costumer_id field").isString().withMessage("An error ocurred on costumer_id field"),
		body("origin").notEmpty().withMessage("An error ocurred on origin field").isString().withMessage("An error ocurred on origin field"),
		body("destination").notEmpty().withMessage("An error ocurred on destination field").isString().withMessage("An error ocurred on destination field"),
	]
 ,rideController.estimateRoute.bind(rideController)
);

router.post("/confirm", 
	[
		body("customer_id").notEmpty().withMessage("An error ocurred on costumer_id field").isString().withMessage("An error ocurred on costumer_id field"),
		body("origin").notEmpty().withMessage("An error ocurred on origin field").isString().withMessage("An error ocurred on origin field"),
		body("destination").notEmpty().withMessage("An error ocurred on destination field").isString().withMessage("An error ocurred on destination field")
		.custom((value, {req}) => {
			if (value === req.body.origin) {
				throw new Error('Destination and origin field need to be diferent')
			}

			return true;
		}),
		body("distance").notEmpty().withMessage("An error ocurred on distance field").isNumeric().withMessage("An error ocurred on distance field"),
		body("duration").notEmpty().withMessage("An error ocurred on duration field").isString().withMessage("An error ocurred on duration field"),
		body("driver").isObject().withMessage("An error ocurred on driver field"),
		body("driver.id").isInt().withMessage("An error ocurred on driver.id field"),
		body("driver.name").notEmpty().withMessage("An error ocurred on driver.name field").isString().withMessage("An error ocurred on driver.name field"),
		body("value").isNumeric().withMessage("An error ocurred on driver.name field")
	]
 ,rideController.confirmRide.bind(rideController)
);

export default router;
