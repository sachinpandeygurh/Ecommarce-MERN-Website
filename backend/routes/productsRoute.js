const express = require('express')
const app=express();
const bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails} = require('../controller/productController');
const { isAuthenticateduser, authorizeRoles } = require('../middleware/auth');
const router = express.Router()


router.route('/products').get( getAllProducts)
router.route('/product/new').post(isAuthenticateduser, authorizeRoles("admin"), createProduct)
router.route('/product/:id').put(isAuthenticateduser, authorizeRoles('admin'), updateProduct).delete(isAuthenticateduser, authorizeRoles('admin'), deleteProduct).get(getProductDetails)

module.exports=router