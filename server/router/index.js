import Router from 'koa-router';

import HomeController from '../controller';
import PayPalContorller from '../controller/paypal';

const router = new Router();

router.get('/', HomeController);

router.post('/api/order/payment', PayPalContorller);

export default router;
