import { handler } from "../../lambda/getUserById";
import { createDbConnection } from "../../utils/createDbConnection";
process.env.TABLE_NAME = "BackendStack-User00B015A1-6F2R7ZS8BXAS";

jest.mock("../../utils/createDbConnection", () => ({
  createDbConnection: jest.fn(),
}));

describe("getUserById test", () => {
  const mockGet = jest.fn();
  const Item = { user_id: "hello" };

  beforeEach(() => {
    mockGet.mockReturnValue({
      promise: jest.fn().mockResolvedValue({ promise: jest.fn() }),
    });
    createDbConnection.mockReturnValue({
      get: mockGet,
    });
  });

  afterEach(jest.clearAllMocks);

  it("gets user", async () => {
    const response = await handler({
      queryStringParameters: {
        user_id: "hello",
      },
    });
    expect(mockGet).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  });

  it("gets user error with no user_id", async () => {
    const response = await handler({});
    expect(mockGet).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });
});
