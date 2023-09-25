const { Router } = require("express");
const { Type } = require("../db.js");
const { getTypes } = require('../middlewares/TypeMiddleware.js');
const router = Router();

router.get('/', async (req, res) => {
await  getTypes()
let types = await Type.findAll({order:['name']})
return res.status(200).send(types)
})

module.exports = router;