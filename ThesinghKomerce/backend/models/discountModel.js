import mongoose from 'mongoose';

const discountSchema = mongoose.Schema(
  {
    discountCode: {
      type: String,
      required: true,
      unique: true,
    },
    discountValue: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    isApplicableToAll: {
      type: Boolean,
      required: true,
    },
    specificProducts: {
      type: Array,
      required: true,
      default: [],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    timesUsed: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model('discount', discountSchema);

export default Discount;
