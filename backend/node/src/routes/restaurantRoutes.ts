import { Router } from 'express';
import { getRestaurants, getRestaurantDetails, getGroceryItems, getGroceryItemDetails } from '../controllers/restaurantController';

const router = Router();

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurantDetails);
router.get('/groceries', getGroceryItems);
router.get('/groceries/:id', getGroceryItemDetails);

export default router;
