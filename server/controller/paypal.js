import PayPal from '../paypal';

var paymentData = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": "http://return.url",
    "cancel_url": "http://cancel.url"
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
      "total": "1.00"
    },
    "description": "This is the payment description."
  }]
};

PayPal.payment.create(paymentData, (error, payment) => {
  if (error) {
    throw error;
  } else {
    console.log("Create Payment Response");
    console.log(payment);
  }
});
