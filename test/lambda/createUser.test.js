import { handler } from "../../lambda/createUser";
import { createDbConnection } from "../../utils/createDbConnection";

process.env.TABLE_NAME = "BackendStack-User00B015A1-6F2R7ZS8BXAS";

jest.mock("../../utils/createDbConnection", () => ({
  createDbConnection: jest.fn(),
}));

// mockPut.mockReturnValue({ promise: jest.fn().mockResolvedValue() });

describe("create method", () => {
  const mockDynamoDbPut = jest.fn().mockReturnValue({ promise: jest.fn() });

  beforeEach(() => {
    createDbConnection.mockReturnValue({
      put: mockDynamoDbPut,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Save user", async () => {
    // AWS.DynamoDB.DocumentClient.mockReturnValue(() => ({ put: mockPut}))
    const response = await handler({
      body: JSON.stringify({ user_id: "hello", password: "dsfdfe" }),
    });
    expect(mockDynamoDbPut).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
  });

  test("Save user error without password", async () => {
    // AWS.DynamoDB.DocumentClient.mockReturnValue(() => ({ put: mockPut}))
    const response = await handler({
      body: JSON.stringify({ user_id: "hello" }),
    });
    expect(mockDynamoDbPut).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });

  test("Save user error without user_id", async () => {
    // AWS.DynamoDB.DocumentClient.mockReturnValue(() => ({ put: mockPut}))
    const response = await handler({
      body: JSON.stringify({}),
    });
    expect(mockDynamoDbPut).not.toHaveBeenCalled();
    expect(response.statusCode).toBe(400);
  });

  test("500 response when error", async () => {
    mockDynamoDbPut.mockRejectedValue();
    const response = await handler({
      body: JSON.stringify({ user_id: "hello", password: "dsfdfe" }),
    });
    expect(response.statusCode).toBe(500);
  });
});
