const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getProductSchema,
  createProductSchema,
} = require('./validations');
const {
  getProductAll,
  getProductDetail,
  getProductList,
  getDiscount,
  getallDiscount,
  createProduct,
} = require('./controller');

router.route('/getall')
  .get(getProductAll)
  // .post(validateSchema(createProductSchema), createProduct);

// router.route('/:id')
//   .get(validateSchema(getProductSchema), getProductDetail);



router.get("/getlist", getProductList);

router.get('/flashsale', getDiscount);
router.get('/allflashsale',getallDiscount);

// GET ALL
// router.get('/', getProductAll);

// GET DETAIL
// router.get('/:id', validateSchema(getProductSchema), getProductDetail);

// POST
// router.post('/', validateSchema(createProductSchema), createProduct);

// DELETE
// router.delete('/:id', validateSchema(getProductSchema), deleteProduct);

// UPDATE
// router.patch('/:id', validateSchema(createProductSchema), updateProduct);

module.exports = router;