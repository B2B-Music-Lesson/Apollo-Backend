import { APIGatewayProxyHandler } from "aws-lambda";
import { createDbConnection } from "../utils";
const header = {
  "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

// import * as AWS from 'aws-sdk'
// AWS.config.update({region:'us-west-2'});
// console.log("table name", process.env.TABLE_NAME)
export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const db = createDbConnection();
    const id = event.queryStringParameters
      ? event.queryStringParameters.user_id
      : "";

    if (id) {
      const params = {
        TableName: process.env.TABLE_NAME || "",
        Key: {
          user_id: id,
        },
      };
      var { Item } = await db.get(params).promise();
    } else {
      return {
        statusCode: 400,
        body: "missing use_id",
        headers: header,
      };
    }
    console.log(JSON.stringify(Item));
    return {
      statusCode: 200,
      body: JSON.stringify(Item),
      headers: header,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "[ServerError] " + JSON.stringify(error),
      headers: header,
    };
  }
};
