const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ns_movie_fest',
  password: '',
  port: 5432,
})

const getMovies = (request, response) => {
  pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addMovies = (request, response) => {
  const {name, description } = request.body

  pool.query('INSERT INTO movies (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({
      "message" : 'Insert Movie success !',
      "data" : request.body
    })
  })
}

const addFestivals = (request, response) => {
  const {name, movie_id, start_date, end_date, description} = request.body

  pool.query('INSERT INTO festivals (name, movie_id, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5)', [name, movie_id, start_date, end_date, description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json({
      "message" : 'Insert Festival success !',
      "data" : request.body
    })
  })
}

const getFestivals = (request, response) => {
  pool.query('Select * from festivals order by id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDetailMovie = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Select * from movies where id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows < 1 ){
      response.status(404).json({
        "message" : "Movie with id " + id + " is not found"
      })
    }
    response.status(200).json(results.rows)
  })
}
module.exports = {
  getMovies,
  addMovies,
  addFestivals,
  getFestivals,
  getDetailMovie
}