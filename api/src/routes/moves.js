const { Router } = require("express");
const { Move } = require("../db.js");
const { getMoves } = require('../middlewares/MoveMiddleware.js')

const router = Router();

router.get('/', async (req, res) => {
await getMoves()
   let moves = await Move.findAll({order:['name']})
    return res.status(200).send(moves)
})



module.exports = router;