"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
describe("POST /users", () => {
    it("returns a status code 200 if body contains unique email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send({
            name: "john doe",
            email: `test-${Math.random()}@test.com`,
            dob: "01/01/2001"
        });
        expect(res.statusCode).toEqual(200);
    }));
    it("returns a status code 400 if duplicate email test@test.com already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonUniqueEmail = `test-${Math.random()}@test.com`;
        // create user with email
        yield (0, supertest_1.default)(index_1.default).post("/users").send({
            name: "john doe",
            email: nonUniqueEmail,
            dob: "01/01/2001"
        });
        // create user with the same email
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send({
            name: "john doe",
            email: nonUniqueEmail,
            dob: "01/01/2001"
        });
        expect(res.statusCode).toEqual(400);
    }));
    it("returns a status code 400 if an unnacceptable birthday format is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send({
            name: "john doe",
            email: `test@test.com`,
            dob: "not birthday format"
        });
        expect(res.statusCode).toEqual(400);
    }));
});
describe("GET /users/:id", () => {
    it("returns a status code 400 if id param is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/users/nan");
        expect(res.statusCode).toEqual(400);
    }));
});
describe("DELETE /users/:id", () => {
    it("deletes a user with an ID that exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/users")
            .send({
            name: "john doe",
            email: `test-${Math.random()}@test.com`,
            dob: "01/01/2001"
        });
        const id = res.body.rows[0].id;
        yield (0, supertest_1.default)(index_1.default).delete(`/users/${id}`);
        expect(res.statusCode).toBe(200);
    }));
});
