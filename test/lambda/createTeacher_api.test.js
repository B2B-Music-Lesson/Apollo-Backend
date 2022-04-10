import * as AWS from "aws-sdk";

const createTeacher = require("../../lambda/createTeacher");
const eventGenerator = require("../helpers/eventGenerator");
const validators = require("../helpers/validators");

process.env.TABLE_NAME = "BackendStack-TeacherA3F6831D-12DV8IWNK8TOA";
AWS.config.update({ region: "us-west-2" });

describe("create user integration test", () => {
  test("test body and return from api gateway", async () => {
    const event = eventGenerator({
      body: {
        teacher_id: "ghtsj",
        password: "gbgrtab",
        is_teacher: false,
        firstName: "test",
        lastName: "6",
      },
    });
    const res = await createTeacher.handler(event);
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("should return 200 if create successful", async () => {
    const event = eventGenerator({
      body: {
        teacher_id: "ghtsj",
        password: "gbgrtab",
        is_teacher: false,
        firstName: "test",
        lastName: "6",
      },
    });
    const res = await createTeacher.handler(event);
    // console.log('res ',res);
    expect(res.statusCode).toBe(200);
    // const body = JSON.parse(res.body);
    // console.log("body ", event.body)
    expect(res.body).toEqual("success");
  });

  test("should return 400 if teacher_id is empty", async () => {
    const event = eventGenerator({
      body: {
        password: "gbgrtab",
        is_teacher: false,
        firstName: "test",
        lastName: "6",
      },
    });
    const res = await createTeacher.handler(event);
    // console.log('res ',res);
    expect(res.statusCode).toBe(400);
    // console.log("body ", event.body)
  });

  test("should return 400 if password is empty", async () => {
    const event = eventGenerator({
      body: {
        teacher_id: "ghtsj",
        is_teacher: false,
        firstName: "test",
        lastName: "6",
      },
    });
    const res = await createTeacher.handler(event);
    // console.log('res ',res);
    expect(res.statusCode).toBe(400);
    // console.log("body ", event.body)
  });
});
