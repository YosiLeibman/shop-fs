const router = require("express").Router();

const { cart, products } = require("../db/data");

const { usersOnly } = require("../middleweres/verify");

router.get('/', usersOnly, (req,res)=>res.send(cart[req.user.username] || [] ))


router.post("/", usersOnly, (req, res) => {
  const { prodId } = req.body;
  // check if product id exists in the body
  if (!prodId) {
    return res.status(400).send("missing product id");
  }

  // check if product exists in the prod array
  const prod = products.find((product) => product.id === prodId);

  if (!prod) {
    return res.status(400).send("missing product");
  }

  // check if there's an open cart for the current user
  if (!cart[req.user.username]) {
    cart[req.user.username] = [];
  }
  //   add prod to user's cart
  cart[req.user.username].push(prod);

  res.send(cart[req.user.username])
});

router.delete("/", usersOnly, (req, res) => {
  const { prodId } = req.body;
  // check if product id exists in the body
  if (!prodId) {
    return res.status(400).send("missing product id");
  }

  cart[req.user.username] = cart[req.user.username].filter(
      prod=>prod.id !== prodId
  )

  res.send(cart[req.user.username])
});

router.put("/pay", usersOnly, (req, res) => {
    const {cardNum, cardExp, cvv} = req.body
    
    if(!cardNum || !cardExp || !cvv){
        return res.status(400).send("missing some info")
    }

    cart[req.user.username] = []

    res.send("paymant was successful")
});

module.exports = router;
