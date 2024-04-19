import Category from "../../data-model/CategoryModel.js";
import Menu from "../../data-model/MenuModel.js";
import Product from "../../data-model/ProductModel.js";

function logoutHandler(req, res) {

    try{

        res.clearCookie("token");
        res.status(200).send("User logged out");

    }catch(error){
        res.status(400).send("couldn't log out");
        return;
    }

}

export default  logoutHandler