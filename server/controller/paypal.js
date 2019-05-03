import PayPal from '../paypal';
import ProductModel from '../models';

export default async (ctx, next) => {
  try {
    const params = ctx.request.body;
    const product = await ProductModel.findById(params.id);
    const total = (product.quantity * product.price).toFixed(2);
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/'
      },
      transactions: [{
        item_list: {
          items: [{
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            currency: product.currency,
            description: product.description,
          }]
        },
        amount: {
          currency: 'USD',
          total,
        },
        description: "This is the payment description."
      }]
    };

    const token = await new Promise((resolve, reject) => {
      PayPal.payment.create(paymentData, (error, res) => {
        if (error) {
          reject(error);
        } else {
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

    ctx.body = {
      errMsg: 'Ok',
      token,
    };
  } catch (error) {
    ctx.status = error.response.httpStatusCode;
    ctx.body = error.response;
  }
}
