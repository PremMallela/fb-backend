import mongoose, {Schema} from "mongoose"

const menuSchema = new mongoose.Schema({
    outletId: {
        type: Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        default: []
    }]
  }, { collection : 'menus'})

const Menu = mongoose.model( 'Menu', menuSchema )

  export default Menu
