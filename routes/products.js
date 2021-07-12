const router = require("express").Router();
const { products } = require("../db/data");

router.get('/', (req,res)=>res.send(products))

module.exports = router;
