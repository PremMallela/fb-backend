import Category from "../../data-model/CategoryModel.js";
import Menu from "../../data-model/MenuModel.js";
import Product from "../../data-model/ProductModel.js";

function logoutHandler(req, res) {

    try{

        res.cookie("token","", { maxAge : 1 ,httpOnly: true, sameSite: "none", secure: true });       
        res.status(200).send("User logged out");
        return;
    }
    catch(error){
        res.status(400).send("couldn't log out");
    }

}

export default  logoutHandler