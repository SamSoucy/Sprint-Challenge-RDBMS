const router = require('express').Router();

const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)


//************adds a new action************/

router.post("/", (req, res) => {
    db("actions")
        .insert(req.body)
        .then(([id]) => {
        
            db("actions")
                .where({ id })
                .first()
                .then(response => {
                    res.status(200).json(response);
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
});





module.exports = router;