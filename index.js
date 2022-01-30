const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.get('/movies', db.getMovies)
app.post('/movies/add', db.addMovies)
app.post('/festivals/add', db.addFestivals)
app.get('/festivals', db.getFestivals)
app.get('/movies/:id', db.getDetailMovie)