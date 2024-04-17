import mongoose, {Schema} from "mongoose"

const orderSchema = new mongoose.Schema({
    outletId: {
        type: Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true }
    }],
    customerName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['in process', 'ready', 'closed'],
        default: 'in process'
    }
  }, { collection : 'orders'})

const Order = mongoose.model('Order', orderSchema);

export default Order;
