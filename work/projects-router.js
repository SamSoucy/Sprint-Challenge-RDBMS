const router = require('express').Router();

const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)



// ******all actions for a project with the specified id*****/

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    db('actions')
    .where("project_id", id)
        .then(names => {
            if (names.length) {
                res.json(names)
            } else {
                res.status(400).json({ message: "This project does not have any actions" })
            }
    })
    .catch(() => {
        res.status(500).json({ message: "Could not find actions in this project" })
    })
});




//************adds a new project************/

router.post("/", (req, res) => {
    db("projects")
        .insert(req.body)
        .then(([id]) => {
        
            db("projects")
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