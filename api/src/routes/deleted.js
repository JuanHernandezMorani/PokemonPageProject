const { Router } = require('express');
const { Pokemon } = require('../db.js');

const router = Router();

router.delete('/:id', async(req,res) => {
    const id = req.params.id;
    let pokemon = await Pokemon.findOne({where: {id: id}});
    if(pokemon){
        await Pokemon.destroy({
            where:{id: id},
        });
       return res.status(200).send({message: `Deleting Pokemon with id: ${id}`})
    }
    return res.status(412).send({message: 'Error 412: cant delete pokemon'})
});

module.exports = router;