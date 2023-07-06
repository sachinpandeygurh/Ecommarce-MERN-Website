const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter the product description'],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'Please enter the product price'],
    maxlength: [4, "Price can't exceed 8 characters"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please enter the product category']
  },
  stock: {
    type: Number,
    required: [true, 'Please enter the product stock'],
    max: [9999, "Stock can't exceed 4 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        maxlength: [280, 'Comment should be less than or equal to 280 characters'],
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);

/*
// {
//   "name": "Sample Product",
//   "description": "This is a sample product description",
//   "price": 1200,
//   "category": "Sample Category",
//   "images": 
//     {
//       "public_id": "sample-public-id",
//       "url": "sample-url"
//     },
//   "stock": 10,
//   "reviews": 
//     {
//       "name": "John Doe",
//       "rating": 4,
//       "comment": "This is a sample review"
//     }
// }
*/