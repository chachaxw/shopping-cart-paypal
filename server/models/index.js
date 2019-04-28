import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
});

export default mongoose.model('Order', orderSchema);

