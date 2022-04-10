import { handler } from "../../lambda/login";
import { createDbConnection } from "../../utils/createDbConnection";
process.env.TABLE_NAME = "BackendStack-User00B015A1-6F2R7ZS8BXAS";

jest.mock("../../utils/createDbConnection", () => ({
  createDbConnection: jest.fn(),
}));

describe("login user test", () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    mockGet.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ promise: jest.fn() }),
    });
    createDbConnection.mockReturnValue({
      get: mockGet,
    });
  });

  afterEach(jest.clearAllMocks);

  it("login user sucessful with correct password", async () => {
    const response = await handler({
      body: JSON.stringify({
        id: "dfgff",
        password: "ggrt",
      }),
    });
    expect(mockGet).toHaveBeenCalled();
    expect(response.statusCode).toBe(403);
  });

  it("login user unsucessful with incorrect password", async () => {
    const response = await handler({
      body: JSON.stringify({
        id: "hello",
        password: "gdhrsg",
      }),
    });
    expect(mockGet).toHaveBeenCalled();
    expect(response.statusCode).toBe(403);
  });

  it("logun user error with empty object", async () => {
    const response = await handler({});
    expect(mockGet).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });
});
