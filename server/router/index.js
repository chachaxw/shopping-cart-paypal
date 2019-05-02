import Router from 'koa-router';

import HomeController from '../controller';
import PayPalContorller from '../controller/paypal';

const router = new Router();

router.get('/', HomeController);

router.post('/api/order', PayPalContorller);

export default router;
