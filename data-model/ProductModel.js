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
        message: 'Username cannot contain only whitespace'
      }
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    
    tagIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag' 
    }],

    uom: {
        type: String,
        required: true
    },

    ppu: {
        type: String,
        required: true
    },

    imagePath: [{
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
