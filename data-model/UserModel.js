import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
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