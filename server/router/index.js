import Router from 'koa-router';

import HomeController from '../controller';
import PayPalController from '../controller/paypal';

const router = new Router();

router.get('/', HomeController);

router.post('/api/order/payment', PayPalController);

export default router;
