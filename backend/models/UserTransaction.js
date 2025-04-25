const mongoose = require('mongoose');

// This defines the schema for UserTransaction
const UserTransactionSchema = new mongoose.Schema({
  
  // Provides a unique transaction ID for every order
  transactionId: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // References to the product being purchased
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },

  // Quantity / number of items ordered
  orderQuantity: { 
    type: Number, 
    required: true 
  },

  // Shows the order status: 0 - Pending, 1 - Completed, 2 - Canceled
  orderStatus: { 
    type: Number, 
    enum: [0, 1, 2], 
    default: 0 
  },

  // Email of the user who placed the order (can be changed to userId if preferred)
  email: { 
    type: String, 
    required: true 
  },

  // Date when the order was placed
  dateOrdered: { 
    type: Date, 
    default: Date.now 
  },

  // Time of the order stored as a string (can be extracted from Date if needed)
  time: { 
    type: String 
  }
});

// Export the model to be used in routes/controllers
module.exports = mongoose.model('UserTransaction', UserTransactionSchema);
