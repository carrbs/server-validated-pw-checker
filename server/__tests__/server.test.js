const request = require("supertest");
const app = require("../server");
jest.mock("../databaseHelpers", () => {
  const originalModule = jest.requireActual("../databaseHelpers");
  return {
    __esModule: true,
    ...originalModule,
    writeToDB: jest.fn(),
  };
});

describe("POST /validate", () => {
  it("should validate a valid password", async () => {
    const res = await request(app).post("/validate").send({
      password: "P@ssw0rd",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("validations");
    expect(res.body.validations).toHaveLength(5);
    res.body.validations.forEach((validation) => {
      expect(validation.isMet).toBe(true);
    });
    expect(res.body).toHaveProperty("valid");
    expect(res.body.valid).toBe(true);
  });
  it("should not validate an invalid password", async () => {
    const res = await request(app).post("/validate").send({
      password: "",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("validations");
    expect(res.body.validations).toHaveLength(5);
    res.body.validations.forEach((validation) => {
      expect(validation.isMet).toBe(false);
    });
    expect(res.body).toHaveProperty("valid");
    expect(res.body.valid).toBe(false);
  });
});

describe("POST /register", () => {
  beforeEach(() => {
    // Mock console.log and console.error
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log and console.error
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should register a user present in the database", async () => {
    const res = await request(app).post("/register").send({
      email: "email@example.com",
      password: "P@ssw0rd",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Registration successful");
  });

  it("should not register a valid user with an invalid password", async () => {
    const res = await request(app).post("/register").send({
      email: "email@example.com",
      password: "invalid_password",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Invalid password");
  });

  it("should not register an unknown user with an valid password", async () => {
    const res = await request(app).post("/register").send({
      email: "unknown@user.com",
      password: "P@ssw0rd",
    });
    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual("Server error: User not found");
  });
});
