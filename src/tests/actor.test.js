const request = require("supertest");
const app = require("../app");

const URL_ACTORS = "/actors";

const actor = {
    firstName: "Jeremy",
    lastName: "Renner",
    nationality: "Estadounidense",
    image: "imagen_url",
    birthday: "1978-12-29"
}

let actorId

test("POST -> 'URL_ACTORS', should return statusCode to be 201, res.body to be defined and res.body.firstName = actor.firstName", async () => {
    const res = await request(app)
      .post(URL_ACTORS)
      .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test("GET -> 'URL_ACTORS', should return statusCode to be 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
      .get(URL_ACTORS)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET -> 'URL_ACTORS/:id', should return statusCode to be 200, res.body to be defined and res.body.firstName = actor.firstName", async () => {
    const res = await request(app)
      .get(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT -> 'URL_ACTORS/:id', should return statusCode 200, res.body to be defined and res.body.firstName = 'Henrry'", async () => {
    const res = await request(app)
       .put(`${URL_ACTORS}/${actorId}`)
       .send({ firstName: "Henrry" })
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe("Henrry")
})

test("DELETE -> 'URL_ACTORS/:id', should return statusCode 204", async () => {
  const res = await request(app)
      .delete(`${URL_ACTORS}/${actorId}`)
    
  expect(res.statusCode).toBe(204)
})