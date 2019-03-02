const router = require('express').Router();

const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)


//*************returns an array of all actions*************/

router.get('/', (req, res) => {
    db('actions')
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});


//*************returns a action with a the matching id*************/

router.get('/:id', (req, res) => {
    db('actions')
    .where({id: req.params.id})
    .first()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});


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


//***********update a action****************/

router.put('/:id', (req, res) => {
    db('actions')
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      if(response > 0) {
        db('actions')
        .where({ id: req.params.id })
        .first()
        .then(response => {
          res.status(200).json(response)
        })
      } else {
        res.status(404).json({ message: 'action not found' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});


//*************delete a action**************/

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db('actions')
    .where({ id })
    .del()
    .then(response => {
      if(response > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'That action could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  });




module.exports = router;