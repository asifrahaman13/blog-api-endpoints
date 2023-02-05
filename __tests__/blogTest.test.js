const request = require("supertest");
const baseURL = "http://localhost:5000";

// Given user already exist in the data base

let authToken = "";
let success = false;
let blogId = "";

beforeAll(async () => {
  const response = await request(baseURL).post("/api/auth/login").send({
    email: "rex@test.com",
    password: "@Atest98",
  });
  authToken = response.body.authtoken;
  success = response.body.success;
});

afterAll(async () => {
  // const response = await request(baseURL).post("/api/auth/login").send({
  //     email:"rex@test.com",
  //     password:"@Atest98",

  //   })
  authToken = ""; //reset access token
});

describe("POST /addblog", () => {
  it("should return 200", async () => {
    const response = await request(baseURL)
      .post("/api/blogs/addblog")
      .set("auth-token", authToken)

      .send({
        title: "Dummy title 2",
        description: "dummy description 2",
      });
    blogId = response.body._id;

    expect(response.statusCode).toBe(200);
    expect(response.body.createdby).toBe("General");
  });
});

describe("POST /updateblog", () => {
  it("should return 200", async () => {
    const response = await request(baseURL)
      .put(`/api/blogs/updateblog/${blogId}`)
      .set("auth-token", authToken)
      .send({
        title: "update Dummy title 2",
        description: "dummy description 2",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.blog.title).toBe("update Dummy title 2");
  });
});

describe("POST /deleteblog", () => {
  it("should return 200", async () => {
    const response = await request(baseURL)
      .delete(`/api/blogs/deleteblog/${blogId}`)
      .set("auth-token", authToken);

    expect(response.statusCode).toBe(200);
    expect(response.body.Success).toBe("Blog has been deleted");
  });
});
