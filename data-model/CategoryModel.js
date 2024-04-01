import mongoose, { Schema } from 'mongoose'

const categorySchema = new mongoose.Schema({
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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
  }, { collection: 'categories' })
  
  const Category = mongoose.model('Category', categorySchema)
  
  export default Category