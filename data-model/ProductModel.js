import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      validate: {
        validator: function(v) {
            return /\S/.test(v);
        },
        message: 'Product cannot contain only whitespace'
      }
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
        default: []
    }],
    UOM: {
        type: String,
        required: true,
        enum: ['number', 'kilogram', 'milligram', 'litre'],
        default: 'number'
    },
    PPU: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
 }, {collection : "products"});

const Product = mongoose.model('product', productSchema);

 export default Product;
