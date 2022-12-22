import request from 'supertest'
import app from '../src/index'

describe("POST /users", () => {
    it("returns a status code 200 if body contains unique email", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "john doe",
                email: `test-${Math.random()}@test.com`,
                dob: "01/01/2001"
            })

        expect(res.statusCode).toEqual(200)
    })

    it("returns a status code 400 if duplicate email test@test.com already exists", async () => {
        const nonUniqueEmail = `test-${Math.random()}@test.com`

        // create user with email
        await request(app).post("/users").send({
            name: "john doe",
            email: nonUniqueEmail,
            dob: "01/01/2001"
        })

        // create user with the same email
        const res = await request(app)
            .post("/users")
            .send({
                name: "john doe",
                email: nonUniqueEmail,
                dob: "01/01/2001"
            })

        expect(res.statusCode).toEqual(400)
    })

    it("returns a status code 400 if an unnacceptable birthday format is provided", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "john doe",
                email: `test@test.com`,
                dob: "not birthday format"
            })
        
        expect(res.statusCode).toEqual(400)
    })
})

describe("GET /users/:id", () => {
    it("returns a status code 400 if id param is not a number", async () => {
        const res = await request(app)
            .get("/users/nan")

        expect(res.statusCode).toEqual(400)
    })
})

describe("DELETE /users/:id", () => {
    it("deletes a user with an ID that exists", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                name: "john doe",
                email: `test-${Math.random()}@test.com`,
                dob: "01/01/2001"
            })

        const id = res.body.rows[0].id
        await request(app).delete(`/users/${id}`)

        expect(res.statusCode).toBe(200)
    })
})
