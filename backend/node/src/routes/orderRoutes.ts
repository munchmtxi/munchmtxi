import { Router } from 'express';
import { placeOrder, getOrderStatus } from '../controllers/orderController';

const router = Router();

router.post('/orders', placeOrder);
router.get('/orders/:id/status', getOrderStatus);

export default router;
