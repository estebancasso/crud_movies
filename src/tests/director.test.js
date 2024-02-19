const request = require('supertest')
const app = require('../app')

const URL_DIRECTORS = '/directors'

const director = {
    firstName: "Denis",
    lastName: "Villeneuve",
    nationality: "Canadiense",
    image: "imagen_url",
    birthday: "1974-08-12"
}

let directorId

test("POST -> 'URL_DIRECTORS', should return statusCode 201, res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
      .post(URL_DIRECTORS)
      .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'URL_DIRECTORS', should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
      .get(URL_DIRECTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> 'URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = director.firstName", async () => {
    const res = await request(app)
      .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT -> 'URL_DIRECTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = 'William'", async () => {
  const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send({ firstName: "William" })

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe("William")
})

test("DELETE -> 'URL_DIRECTORS/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_DIRECTORS}/${directorId}`)

  expect(res.statusCode).toBe(204)  
})