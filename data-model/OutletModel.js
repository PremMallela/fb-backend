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
          message: 'Outlet name cannot contain only whitespace'
        }
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logo: {
        type: String
    },
    location : {
        type : String,
        required : true,
        minlength: 1,
        validate: {
          validator: function(v) {
              return /\S/.test(v);
          },
          message: 'location cannot contain only whitespace'
        }
    }
  }, { collection : 'outlets'})

const Outlet = mongoose.model( 'Outlet', outletSchema )

  export default Outlet
