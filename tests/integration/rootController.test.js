const request = require("supertest");
const app = require("../../app");


describe("Root Controller", () => {
    describe("get root endpoint", () => {
        it("should return 200 and some html", async () => {
            const response = await request(app)
                .get("/");

            expect(response.status).toBe(200);
            expect(response.text.includes('Server is running'));
        }, 10000);
    });


    describe("post root endpoint", () => {
        it("should return 404", async () => {
            const response = await request(app)
                .post("/");

            expect(response.status).toBe(404);
        }, 10000);
    });
}
)