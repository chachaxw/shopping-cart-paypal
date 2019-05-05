import Router from 'koa-router';

import HomeController from '../controller';
import DiscountController from '../controller/discount';
import PayPalController from '../controller/paypal';

const router = new Router();

router.get('/', HomeController);
router.get('/discount', DiscountController);

router.post('/api/order/payment', PayPalController);

export default router;
