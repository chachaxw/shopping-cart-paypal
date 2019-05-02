import PayPal from '../paypal';
import ProductModel from '../models';

const data = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://localhost:3000/",
    "cancel_url": "http://localhost:3000/"
  },
  "transactions": [{
    "item_list": {
      "items": [{
        "name": "Product Item",
        "sku": "Product Item",
        "price": "15.99",
        "currency": "USD",
        "quantity": 1
      }]
    },
    "amount": {
      "currency": "USD",
      "total": "15.99"
    },
    "description": "This is the payment description."
  }]
};

export default async (ctx, next) => {
  // console.log('请求', ctx.request);

  const token = await new Promise((resolve, reject) => {
    PayPal.payment.create(data, (error, res) => {
      if (error) {
        reject(error);
      } else {
        // console.log("Create Payment Response");
        // console.log(res);
        let token;
        const links = res.links;

        for (let link of links) {
          if (link.rel === 'approval_url') {
            token = link.href.match(/EC-\w+/)[0];
          }
        }

        resolve(token);
      }
    });
  });

  if (token) {
    ctx.body = {
      errMsg: 'Ok',
      token,
    };
  } else {
    ctx.body = {
      errMsg: 'There\'s no token!',
    };
  }
}
