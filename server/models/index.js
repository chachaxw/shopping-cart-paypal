import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  hasDiscount: {
    type: Boolean,
    default: false,
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  discount: {
    percent: Number,
    description: String,
    default: {
      percent: 0,
      description: '',
    },
  },
  description: {
    type: String,
    default: ''
  },
});

export default mongoose.model('Product', productSchema);
