import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    qty: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    discount: {
      type: String,
      default: '',
    },
    discountValue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

// import mongoose from 'mongoose'

// const cartSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },

//     products: [{
//          product:{ type: mongoose.Schema.Types.ObjectId,
//           required: true,
//           ref: 'Product',
//          },
//          qty: {
//           type: Number,
//            required: true
//           },
//      }],
//      discount:{
//        type: mongoose.Schema.Types.ObjectId,

//        default: null,
//        ref: 'Discount',
//      }

//   },
//   {
//     timestamps: true,
//   }
// )

// const Cart = mongoose.model('Cart', cartSchema)

// export default Cart
