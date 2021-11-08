const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  contactNumber: { type: String, required: true },
  area: { type: Schema.Types.ObjectId, ref: 'areas', required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  landmark: { type: String },
  orderDate: { type: Date, required: true, default: new Date() },
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'products', default: null }],
  totalPrice: { type: Number, required: true },
  numberOfItems: { type: Number, required: true },
  discount: { type: Schema.Types.ObjectId, ref: 'discounts', default: null },
  user: { type: Schema.Types.ObjectId, ref: 'users', default: null }
});

const Order = mongoose.model('orders', cartSchema);

module.exports = Order;