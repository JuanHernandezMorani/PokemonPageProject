const { Router } = require("express");
const { Ability } = require("../db.js");
const { getAbilities } = require('../middlewares/AbilitiesMiddleware.js')

const router = Router();

router.get('/', async (req, res) => {
 await getAbilities()
   let abilities = await Ability.findAll({order:['name']})
    return res.status(200).send(abilities)
})



module.exports = router;