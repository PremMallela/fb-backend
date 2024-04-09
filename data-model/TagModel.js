import mongoose,{Schema} from  'mongoose'

const tagSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        minlength: 1,
        validate: {
            validator: function(v) {
                // Check if the username contains only whitespace
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
    }, { collection: 'tags' })

const Tag = new mongoose.model( "Tag", tagSchema ) 

export default Tag
