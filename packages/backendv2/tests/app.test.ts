import request from "supertest"
import nock from "nock"
import app from "../app"
import knex from "../database/knex"
import { UserInfo } from "../src/types"
import data from "./data"

const knexCleaner = require("knex-cleaner")

beforeEach(async () => {
  await knex.seed.run({
    directory: "./database/seeds",
    specific: "a.ts",
  })
})

afterEach(async () => {
  await knexCleaner.clean(knex)
})

afterAll(async () => {
  await knex.destroy()
})

describe("dashboard: get courses", () => {
  beforeEach(async () => {
    nock("https://tmc.mooc.fi")
      .get("/api/v8/users/current?show_user_fields=true")
      .reply(function() {
        const auth = this.req.headers.authorization
        if (auth === "Bearer pleb_token") {
          return [
            200,
            {
              administrator: false,
            } as UserInfo,
          ]
        }
        if (auth === "Bearer admin_token") {
          return [
            200,
            {
              administrator: true,
            } as UserInfo,
          ]
        }
      })
  })

  test("respond with 401 if invalid credentials", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/courses")
      .set("Authorization", `bearer BAD_TOKEN`)
      .expect(401, done)
  })

  test("respond with 403 if insufficient priviledge", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/courses")
      .set("Authorization", `bearer PLEB_TOKEN`)
      .expect(403, done)
  })

  test("reply with courses on valid request", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/courses")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(200)
      .expect(response => {
        const received = response.body
        expect(received).toHaveLength(2)
        expect(
          received.sort((o1: any, o2: any) => o1.id.localeCompare(o2.id)),
        ).toStrictEqual([data.courseValidator1, data.courseValidator2])
      })
      .end(done)
  })
})

describe("dashboard: get quizzes by course id", () => {
  beforeEach(async () => {
    nock("https://tmc.mooc.fi")
      .get("/api/v8/users/current?show_user_fields=true")
      .reply(function() {
        const auth = this.req.headers.authorization
        if (auth === "Bearer pleb_token") {
          return [
            200,
            {
              administrator: false,
            } as UserInfo,
          ]
        }
        if (auth === "Bearer admin_token") {
          return [
            200,
            {
              administrator: true,
            } as UserInfo,
          ]
        }
      })
  })

  test("respond with 401 if invalid credentials", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/courses/46d7ceca-e1ed-508b-91b5-3cc8385fa44b/quizzes",
      )
      .set("Authorization", `bearer BAD_TOKEN`)
      .expect(401, done)
  })

  test("respond with 403 if insufficient credentials", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/courses/46d7ceca-e1ed-508b-91b5-3cc8385fa44b/quizzes",
      )
      .set("Authorization", `bearer PLEB_TOKEN`)
      .expect(403, done)
  })

  test("reply with course quizzes on valid request", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/courses/46d7ceca-e1ed-508b-91b5-3cc8385fa44b/quizzes",
      )
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(200)
      .expect(response => {
        const received = response.body
        expect(received).toHaveLength(2)
        expect(
          received.sort((o1: any, o2: any) => -o1.id.localeCompare(o2.id)),
        ).toStrictEqual([data.quizValidator1, data.quizValidator2])
      })
      .end(done)
  })
})

describe("dashboard: get quiz by id", () => {
  beforeEach(async () => {
    nock("https://tmc.mooc.fi")
      .get("/api/v8/users/current?show_user_fields=true")
      .reply(function() {
        const auth = this.req.headers.authorization
        if (auth === "Bearer pleb_token") {
          return [
            200,
            {
              administrator: false,
            } as UserInfo,
          ]
        }
        if (auth === "Bearer admin_token") {
          return [
            200,
            {
              administrator: true,
            } as UserInfo,
          ]
        }
      })
  })

  test("respond with 401 if invalid credentials", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/quizzes/4bf4cf2f-3058-4311-8d16-26d781261af7")
      .set("Authorization", `bearer BAD_TOKEN`)
      .expect(401, done)
  })

  test("respond with 403 if insufficient credentials", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/quizzes/4bf4cf2f-3058-4311-8d16-26d781261af7")
      .set("Authorization", `bearer PLEB_TOKEN`)
      .expect(403, done)
  })

  test("respond with 404 if invalid quiz id", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/quizzes/4bf4cf2f-3058-4311-8d16-26d781261af8")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(404, done)
  })

  test("reply with quiz on valid request", async done => {
    request(app.callback())
      .get("/api/v2/dashboard/quizzes/4bf4cf2f-3058-4311-8d16-26d781261af7")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(200)
      .expect(response => {
        const received = response.body
        expect(received).toStrictEqual(data.quizValidator1)
      })
      .end(done)
  })
})

describe("dashboard: save quiz", () => {
  beforeEach(async () => {
    nock("https://tmc.mooc.fi")
      .get("/api/v8/users/current?show_user_fields=true")
      .reply(function() {
        const auth = this.req.headers.authorization
        if (auth === "Bearer pleb_token") {
          return [
            200,
            {
              administrator: false,
            } as UserInfo,
          ]
        }
        if (auth === "Bearer admin_token") {
          return [
            200,
            {
              administrator: true,
            } as UserInfo,
          ]
        }
      })
  })

  test("respond with error if required field missing", async done => {
    request(app.callback())
      .post("/api/v2/dashboard/quizzes")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .set("Accept", "application/json")
      .send({ ...data.newQuiz, part: null })
      .expect(500, done)
  })

  test("respond with 401 if invalid credentials", async done => {
    request(app.callback())
      .post("/api/v2/dashboard/quizzes")
      .set("Authorization", `bearer BAD_TOKEN`)
      .set("Accept", "application/json")
      .send(data.newQuiz)
      .expect(401, done)
  })

  test("respond with 403 if invalid credentials", async done => {
    request(app.callback())
      .post("/api/v2/dashboard/quizzes")
      .set("Authorization", `bearer PLEB_TOKEN`)
      .set("Accept", "application/json")
      .send(data.newQuiz)
      .expect(403, done)
  })

  test("save valid quiz", async done => {
    request(app.callback())
      .post("/api/v2/dashboard/quizzes")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .set("Accept", "application/json")
      .send(data.newQuiz)
      .expect(200)
      .expect(response => {
        const received = response.body
        expect(received).toStrictEqual(data.newQuizValidator)
      })
      .end(done)
  })

  test("update existing quiz", async done => {
    request(app.callback())
      .post("/api/v2/dashboard/quizzes")
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .set("Accept", "application/json")
      .send(data.quizUpdate)
      .expect(200)
      .expect(response => {
        const received = response.body
        expect(received).toStrictEqual(data.quizUpdateValidator)
      })
      .end(done)
  })
})

describe("dashboard: get manual review answers", () => {
  beforeEach(async () => {
    await knex.seed.run()
    nock("https://tmc.mooc.fi")
      .get("/api/v8/users/current?show_user_fields=true")
      .reply(function() {
        const auth = this.req.headers.authorization
        if (auth === "Bearer pleb_token") {
          return [
            200,
            {
              administrator: false,
            } as UserInfo,
          ]
        }
        if (auth === "Bearer admin_token") {
          return [
            200,
            {
              administrator: true,
            } as UserInfo,
          ]
        }
      })
  })

  test("respond with 401 if invalid credentials", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/answers/manual-review/2a0c2270-011e-40b2-8796-625764828034?page=0&size=10",
      )
      .set("Authorization", `bearer BAD_TOKEN`)
      .expect(401, done)
  })

  test("respond with 403 if insufficient credentials", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/answers/manual-review/2a0c2270-011e-40b2-8796-625764828034?page=0&size=10",
      )
      .set("Authorization", `bearer PLEB_TOKEN`)
      .expect(403, done)
  })

  test("respond with correct page data 1", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/answers/manual-review/2a0c2270-011e-40b2-8796-625764828034?page=0&size=10",
      )
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(response => {
        const received = response.body
        expect(received).toHaveLength(10)
      })
      .expect(200, done)
  })

  test("respond with correct page data 2", async done => {
    request(app.callback())
      .get(
        "/api/v2/dashboard/answers/manual-review/2a0c2270-011e-40b2-8796-625764828034?page=1&size=10",
      )
      .set("Authorization", `bearer ADMIN_TOKEN`)
      .expect(response => {
        const received = response.body
        expect(received).toHaveLength(5)
      })
      .expect(200, done)
  })
})
