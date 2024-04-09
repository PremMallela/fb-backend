import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^[0-9]{10}$/.test(v)
        },
        message: props => `${props.value} is not a valid 10 digit mobile number!`
      }
    },
    name: {
      type: String,
      required: true,
      minlength: 1
    },
    business_name: {
      type: String,
      required: true,
      minlength: 1
    }
  }, { collection: 'users' })
  
  const User = mongoose.model('User', userSchema)
  
  export default User