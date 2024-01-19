const bcrypt = require("bcrypt");
const { storePassword } = require("../dataStore");
const { writeToDB } = require("../databaseHelpers");

jest.mock("bcrypt");
jest.mock("../databaseHelpers", () => {
  const originalModule = jest.requireActual("../databaseHelpers");
  return {
    __esModule: true,
    ...originalModule,
    writeToDB: jest.fn(),
  };
});

describe("storePassword", () => {
  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should reject with an error for an unknown email", async () => {
    await expect(
      storePassword("unknown@example.com", "password")
    ).rejects.toEqual("User not found");
  });

  it("should hash the password and resolve for a known email", async () => {
    bcrypt.hash.mockImplementation((password, saltRounds, callback) => {
      return callback(null, "hashedPassword");
    });
    await expect(
      storePassword("email@example.com", "password")
    ).resolves.toBeUndefined();
    expect(bcrypt.hash).toHaveBeenCalledWith(
      "password",
      10,
      expect.any(Function)
    );
    expect(writeToDB).toHaveBeenCalledWith(42, "hashedPassword");
  });
});
