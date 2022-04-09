import { APIGatewayProxyHandler } from "aws-lambda";
import { createDbConnection } from "../utils";

// import * as AWS from 'aws-sdk'
// AWS.config.update({region:'us-west-2'});
// console.log("table name", process.env.TABLE_NAME)
export const handler: APIGatewayProxyHandler = async (event) => {
  const db = createDbConnection();
  const id = event.queryStringParameters
    ? event.queryStringParameters.user_id
    : "";
  const params = {
    TableName: process.env.TABLE_NAME || "",
    Key: {
      user_id: id,
    },
  };
  var { Item } = await db.get(params).promise();

  console.log(JSON.stringify(Item));
  return {
    statusCode: 200,
    body: JSON.stringify(Item),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  };
};
