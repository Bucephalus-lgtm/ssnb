const express = require("express");
const router = express.Router();

const {
    create,
    productById,
    read,
    photo
} = require('../controllers/notice');

router.get('/', (req, res) => res.send('TEST PASSED!'));
// router.get("/product/:productId", read);
router.get("/notice/create", (req, res) => res.render('notices'));
router.post("/notice/create", create);

router.get("/product/photo/:productId", photo);

// router.param("productId", productById);

module.exports = router;