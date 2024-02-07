const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//? Tabla pivote -> movieGenre
Movie.belongsToMany(Genre, {through: 'movieGenre'})
Genre.belongsToMany(Movie, {through: 'movieGenre'})

//? Tabla pivote -> movieActor
Movie.belongsToMany(Actor, {through: 'movieActor'})
Actor.belongsToMany(Movie, {through: 'movieActor'})

//? Tabla pivote -> movieDirector 
Movie.belongsToMany(Director, {through: 'movieDirector'})
Director.belongsToMany(Movie, {through: 'movieDirector'})

