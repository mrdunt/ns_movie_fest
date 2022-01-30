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
app.get('/movies/:id', db.getDetailMovie)
app.post('/movies/add', db.addMovies)
app.delete('/movies/delete/:id', db.deleteMovie)

app.post('/festivals/add', db.addFestivals)
app.get('/festivals/:id', db.getDetailFestival)
app.get('/festivals', db.getFestivals)
app.delete('/festivals/delete/:id', db.deleteFestival)
app.get('/asa/search/', db.searchFestival)