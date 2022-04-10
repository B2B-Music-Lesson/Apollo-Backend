import { APIGatewayProxyHandler } from "aws-lambda";
import AWS = require("aws-sdk");

const header = {
  "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const db = new AWS.DynamoDB.DocumentClient();
    const user_id = event.queryStringParameters
      ? event.queryStringParameters.user_id
      : "";
    
    const challenge_id = event.queryStringParameters
    ? event.queryStringParameters.challenge_id
    : "";

    if (user_id && challenge_id) {
      const params = {
        TableName: process.env.TABLE_NAME || "",
        Key: {
          user_id: user_id,
          challenge_id: challenge_id
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
