const router = require('express').Router();

const knex = require('knex');

const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)



//*************returns an array of all projects*************/

router.get('/', (req, res) => {
    db('projects')
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});



// ******all actions for a project with the specified id*****/


router.get('/:id', (req, res) => {
    const { id } = req.params
    db('projects')
      .where('projects.id', id)
      .then(project => {
        const oneProject = project[0]
        db('actions')
          .select(
            'actions.id',
            'actions.description',
            'actions.notes',
            'actions.project_id',
            'actions.completed'
            
          )
          .where('actions.project_id', id)
          .then(actions => {
            if (!oneProject) {
              res.status(404).json({ err: 'project ID is not correct' })
            } else {
              res.json({
                id: oneProject.id,
                name: oneProject.name,
                description: oneProject.description,
                completed: oneProject.completed,
                actions: actions
              })
            }
          })
      })
      .catch(() => {
        res
          .status(404)
          .json({ error: 'This project has no actions' })
      })
  })




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

//***********update a project****************/

router.put('/:id', (req, res) => {
    db('projects')
    .where({ id: req.params.id })
    .update(req.body)
    .then(response => {
      if(response > 0) {
        db('projects')
        .where({ id: req.params.id })
        .first()
        .then(response => {
          res.status(200).json(response)
        })
      } else {
        res.status(404).json({ message: 'project not found' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

//*************delete a project**************/

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db('projects')
    db('projects')
    .where({ id })
    .del()
    .then(response => {
      if(response > 0) {
        res.status(204).end()
      } else {
        res.status(404).json({ message: 'That project could not be found' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  });




module.exports = router;