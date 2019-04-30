import PayPal from 'paypal-rest-sdk';

const options = {
  mode: 'sandbox',
  clientId: 'Ab--raJCbvkn4IEVyJP70M8RGJkNbPQQnhpJK4CiUumArOZvhP1ae3g8mJdJAO_HNat-X1PZNhwREDaR',
  clientSecret: 'EHdIiqqmAoyuTAJ_bKIBjt1mdbAUDD0Mk1B8lagLe9auHG5aAUYxxX4LObFklNf8O0GiiLRNysCI9Wbd',
};

// PayPal config
PayPal.configure({
  'mode': options.mode, //sandbox or live
  'client_id': options.clientId,
  'client_secret': options.clientSecret,
});

export default PayPal;
