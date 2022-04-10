import { APIGatewayProxyHandler } from "aws-lambda";
import { createDbConnection } from "../utils/createDbConnection";

const access = {
  "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

export const handler: APIGatewayProxyHandler = async (event) => {
  const db = createDbConnection();
  try {
    const item = JSON.parse(event.body || "{}");

    // console.log('body', event.body);
    console.log("item", item);
    console.log("table name", process.env.TABLE_NAME);

    // Check if parameters are valid
    if (!(item?.user_id && item?.password)) {
      return {
        statusCode: 400,
        headers: access,
        body: "[InvalidRequest]",
      };
    }

    const params = {
      TableName: process.env.TABLE_NAME || "BackendStack-ChallengeAB0B3A70-UT76JESBO4YR",
      Item: item,
    };

    await db.put(params).promise();

    return {
      statusCode: 200,
      body: "success",
      headers: access,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "[ServerError] " + JSON.stringify(error),
      headers: access,
    };
  }
};
