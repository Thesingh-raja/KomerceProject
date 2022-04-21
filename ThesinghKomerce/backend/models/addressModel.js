import mongoose from 'mongoose';

const addressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    billingAddress: {
      name: { type: String, default: '' },
      billingEmail: { type: String, default: '' },
      billingPhone: { type: String, default: '' },
      billingAddress: { type: String, default: '' },
      billingPostalCode: { type: String, default: '' },
    },
    shippingAddress: {
      name: { type: String, default: '' },
      shippingEmail: { type: String, default: '' },
      shippingPhone: { type: String, default: '' },
      shippingAddress: { type: String, default: '' },
      shippingPostalCode: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;
