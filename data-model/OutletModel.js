import mongoose, {Schema} from "mongoose"


const outletSchema = new mongoose.Schema({
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
    },
    
    logoPath: {
        type: String,
        required: true
    },

    location : {
        type : String,
        required : true
    }
  }, { collection : 'outlets'})

  const Outlet = mongoose.model( 'Outlet', outletSchema )

  export default Outlet
