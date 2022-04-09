import * as AWS from "aws-sdk";

export const createDbConnection = () => {
  return new AWS.DynamoDB.DocumentClient();
};
