require("../models");

const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

const URL_MOVIES = "/movies";

const movie = {
  name: "La llegada",
  image: "imagen_url",
  synopsis:
    "Doce naves extraterrestres comienzan a llegar a nuestro planeta. Los altos mandos militares piden ayuda a una experta lingüista para intentar averiguar si los alienígenas vienen en son de paz o suponen una amenaza.",
  releaseYear: 2016,
};

let movieId;

test("POST -> 'URL_MOVIES', should return statusCode 201, res.body to be defined and res.body.name = movie.name", async () => {
  const res = await request(app).post(URL_MOVIES).send(movie);

  movieId = res.body.id;

  expect(res.statusCode).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET -> 'URL_MOVIES', should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(URL_MOVIES);

  // console.log(res.body)

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)

  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].actors).toHaveLength(0)

  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].directors).toHaveLength(0)

});

test("GET -> 'URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name = movie.name", async () => {
  const res = await request(app)
    .get(`${URL_MOVIES}/${movieId}`);
    
  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT -> 'URL_MOVIES/:id', should return statusCode 200, res.body to be defined and res.body.name = 'Inframundo'", async () => {
  const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send({ name: "Inframundo" });

  expect(res.statusCode).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe("Inframundo");
});

test("POST -> 'URL_MOVIES/:id/actors', should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {

  const result = await Actor.create({
    firstName: "Jeremy",
    lastName: "Renner",
    nationality: "Estadounidense",
    image: "imagen_url",
    birthday: "1978-12-29"
  });

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([result.id])

//   console.log(res.body)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].movieActor.movieId).toBe(movieId)
  expect(res.body[0].movieActor.actorId).toBe(result.id)

  await result.destroy()
  
});

test("POST -> 'URL_MOVIES/:id/directors', should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {
    
    const result = await Director.create({
        firstName: "Denis",
        lastName: "Villeneuve",
        nationality: "Canadiense",
        image: "imagen_url",
        birthday: "1974-08-12"
    })

    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/directors`)
      .send([result.id])

    // console.log(res.body)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].movieDirector.movieId).toBe(movieId)
    expect(res.body[0].movieDirector.directorId).toBe(result.id)

    await result.destroy()
})

test("POST -> 'URL_MOVIES/:id/genres', should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {

  const result = await Genre.create({
    name: "Ficción"
  })

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([result.id])

  // console.log(res.body)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].movieGenre.movieId).toBe(movieId)
  expect(res.body[0].movieGenre.genreId).toBe(result.id)

  await result.destroy()
})

test("DELETE -> 'URL_MOVIES/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_MOVIES}/${movieId}`);

  expect(res.statusCode).toBe(204);
});
