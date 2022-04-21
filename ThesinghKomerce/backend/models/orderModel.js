import mongoose from 'mongoose';

import {AutoIncrement} from '../config/db.js';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderNo: {
      type: Number,
      required: true,
      default: '11111',
    },
    inventoryReduced: {
      type: Boolean,
      required: true,
      default: false,
    },

    orderItems: [{}],
    lineItems: [],
    shippingAddress: {},
    billingAddress: {},
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: {type: String},
      status: {type: String},
      update_time: {type: String},
      email_address: {type: String},
    },

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(AutoIncrement, {inc_field: 'orderNo', start_seq: 11111});

const Order = mongoose.model('Order', orderSchema);

export default Order;
