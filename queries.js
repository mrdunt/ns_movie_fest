const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ns_movie_fest',
  password: '',
  port: 5432,
})

/*
  Get All Movies
  :return all movies
*/
const getMovies = (request, response) => {
  pool.query('SELECT * FROM movies ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

/*
  Add Single Movie
  :require json body: name, description
*/
const addMovies = (request, response) => {
  const {name, description } = request.body

  pool.query('INSERT INTO movies (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({
      "message" : 'Insert Movie success !',
      "data" : request.body
    })
  })
}

/*
  Add Single Festival
  :require json body: name, movie_id, start_date, end_date, description
*/
const addFestivals = (request, response) => {
  const {name, movie_id, start_date, end_date, description} = request.body

  pool.query('INSERT INTO festivals (name, movie_id, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5)', [name, movie_id, start_date, end_date, description], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).json({
      "message" : 'Insert Festival success !',
      "data" : request.body
    })
  })
}

/*
  Get All Festivals
  :return all festivals
*/
const getFestivals = (request, response) => {
  pool.query('Select * from festivals order by id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

/*
  Get Detail Movie
  :require param: id
*/
const getDetailMovie = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Select * from movies where id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows < 1 ){
      response.status(404).json({
        "message" : "Movie with id " + id + " is not found"
      })
      return;
    }
    response.status(200).json(results.rows)
  })
}

/*
  Delete Single Movie
  :require param: id
*/
const deleteMovie = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Delete from movies where id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({
      "message": "Movie with id " + id + " is successfully deleted"
    })
  })
}

/*
  Delete Single Festival
  :require param: id
*/
const deleteFestival = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Delete from festivals where id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({
      "message": "Festival with id " + id + " is successfully deleted"
    })
  })
}

/*
  Get Detail Festival
  :require param: id
*/
const getDetailFestival = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('Select * from festivals where id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows < 1 ){
      response.status(404).json({
        "message" : "Festival with id " + id + " is not found"
      })
      return;
    }
    response.status(200).json(results.rows)
  })
}

/*
  Get Festivals based on criteria
  :optional json body: name, movie_id, (start_date and end_date)
*/
const searchFestival = (request, response) => {
  const {name, start_date, end_date, movie_id} = request.body
  if (start_date && end_date){
    pool.query('Select * from festivals where start_date >= $1 and end_date <= $2', [start_date, end_date], (error, results) => {
      response.status(200).json(results.rows)
    })
  }
  pool.query('Select * from festivals where name like' + "'%"+ request.body.name + "%'" + " or movie_id = $1",[movie_id], (error, results) => {
    if (error){
      response.json(error)
      return;
    }
    if (results.rows < 1 ){
      response.status(404).json({
        "message" : "Festival with id " + name + " is not found"
      })
      return;
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getMovies,
  addMovies,
  addFestivals,
  getFestivals,
  getDetailMovie,
  deleteMovie,
  deleteFestival,
  getDetailFestival,
  searchFestival
}