const request = require("supertest");
const app = require("../../app");

const userTestName = "Test"
const userTestEmail = "test@gail.com"
const userTestPwd = "admin"

async function signupTest() {

    const response = await request(app)
        .post("/user/signup")
        .set("content-type", "application/json")
        .send({
            user_name: userTestName,
            user_email: userTestEmail,
            user_password: userTestPwd,
            user_password_repeat: userTestPwd
        })
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("userName", userTestName);
    expect(response.body.data).toHaveProperty("userEmail", userTestEmail);
    expect(response.body.data).toHaveProperty("token");
}

async function loginTest() {
    const response = await request(app)
        .post("/user/login")
        .set("content-type", "application/json")
        .send({
            user_name: userTestName,
            user_password: userTestPwd
        })
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("userName", userTestName);
    expect(response.body.data).toHaveProperty("userEmail", userTestEmail);
    expect(response.body.data).toHaveProperty("token");
    return response.body.data

}

describe("User Controller", () => {
    describe("post signup endpoint", () => {
        it("should return 200 and expected signup payload", async () => {
            await signupTest()

        }, 10000);
    });

    describe("post login endpoint", () => {
        it("should return 200 and expected login payload", async () => {

            await signupTest();
            await loginTest();

        }, 10000);
    });

    describe("get protected endpoint unauthorized", () => {
        it("should return 401", async () => {
            const response = await request(app)
                .get("/user/protected")

            expect(response.status).toBe(401);
        })
    })

    describe("get protected endpoint authorized", () => {
        it("should return 200", async () => {
            await signupTest();
            const loginPayload = await loginTest();


            const response = await request(app)
                .get("/user/protected")
                .set("Authorization", "Bearer " + loginPayload.token)

            expect(response.status).toBe(200);

        })
    })

    describe("delete user account", () => {
        it("should return 204", async () => {
            await signupTest();

            const response = await request(app)
                .delete("/user/" + userTestName)

            expect(response.status).toBe(204)
        })
    })
}
)