const objectID = require('mongodb').ObjectID

module.exports = function(app, db) {
  app.get('/brands', (req, res) => {
    db.collection('brands').find({}).toArray(function(err, result) {
      if(err) {
        res.send('An error occured when fetching brands')
      } else {
        res.send(result)
      }
    });
  })

  app.get('/brands/:id', (req, res) => {
    const id = req.params.id
    const brandDetails = {'_id': new objectID(id)}
    db.collection('brands').findOne(brandDetails, (err, item) => {
      if (err) {
        res.send({error: 'An error has occured'})
      } else {
        res.send(item)
      }
    })
  })

  app.post('/brands', (req, res) => {
    const brand = {
      name: req.body.name,
      shortDesc: req.body.shortDesc
    }

    db.collection('brands').insert(brand, (err, result) => {
      if(err) {
        res.send({error: 'An error has occured'})
      } else {
        res.send(result.ops[0])
      }
    })
  })

  app.put('/brands/:id', (req, res) => {
    const id = req.params.id
    const brandDetails = {'_id': new objectID(id)}
    const brand = {
      name: req.body.name,
      shortDesc: req.body.shortDesc
    }
    db.collection('brands').update(brandDetails, brand, (err, item) => {
      if(err) {
        res.send({error: 'An error has occured'})
      } else {
        res.send(item)
      }
    })
  })

  app.delete('/brands/:id', (req, res) => {
    const id = req.params.id
    const brandDetails = {'_id': new objectID(id)}
    db.collection('brands').remove(brandDetails, (err, item) => {
      if(err) {
        res.send({error: 'An error has occured'})
      } else {
        res.send(`Brand with id: ${id} was deleted`)
      }
    })
  })
}