import PayPal from '../paypal';
import ProductModel from '../models';

const lifetimeProduct = {
  name: 'Lifetime Protection',
  price: 4.95,
  quantity: 1,
  currency: 'USD',
  description: 'This extended warranty means your product is covered for LIFE.',
};

const shipmentProduct = {
  name: 'Premium Insured Shipping',
  price: 4.95,
  quantity: 1,
  currency: 'USD',
  description: 'Premium Insured Shipping',
};

export default async (ctx, next) => {
  try {
    const params = ctx.request.body;
    const product = await ProductModel.findById(params.id);
    const items = [
      {
        name: product.name,
        price: Number((product.price + 4.95).toFixed(2)),
        quantity: product.quantity,
        currency: product.currency,
        description: product.description,
      },
    ];

    if (params.extraItem) {
      items.push(lifetimeProduct);
    }

    let total = 0;
    items.forEach((item) => total += item.price * item.quantity);

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
        item_list: { items },
        amount: {
          currency: product.currency,
          total: Number(total.toFixed(2)),
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
    console.log(error);
    if (error.response) {
      ctx.status = error.response.httpStatusCode;
      ctx.body = error.response;
    } else {
      ctx.body = error;
    }
  }
}
