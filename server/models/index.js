import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  hasDiscount: {
    type: Boolean,
    default: false,
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
