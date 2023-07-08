
const { Product } = require('../../models');

module.exports = {
  getProductAll: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate('category')
        .populate('supplier');

      return res.send({ code: 200, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      let found = await Product.findById(id)
        .populate('category')
        .populate('supplier');

      if (found) {
        return res.send({ code: 200, payload: found });
      }

      return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    }
  },

  getProductList: async (req, res, next) => {
    try {
      const sort = { length: 1 };
      const limit = 4;
      const skip = 1;
      let results = await Product.find().limit(limit).skip(skip).sort(sort).populate('category').populate('supplier');
      const count = results.length
      return res.send({ code: 200, count, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //get limit discount
  getDiscount: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $gt: 20 },
      };
      const sort = { length: 1 };
      const limit = 4;
      const skip = 1;

      let results = await Product.find(conditionFind)
        .sort(sort)
        .limit(limit)
        .skip(skip);
      let total = await Product.countDocuments();
      return res.send({
        code: 200,
        total,
        count: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  // get all discount
  getallDiscount: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $gt: 20 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();
      return res.send({
        code: 200,
        total,
        count: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  createProduct: async function (req, res, next) {
    try {
      const data = req.body;

      const newItem = new Product(data);

      let result = await newItem.save();

      return res.send({ code: 200, message: 'Tạo thành công', payload: result });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

};