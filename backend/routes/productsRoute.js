const express = require('express')
const app=express();
const bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require('../controller/productController')
const router = express.Router()


router.route('/products').get(getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports=router