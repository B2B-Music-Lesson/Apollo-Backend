import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
console.log("table name", process.env.TABLE_NAME)

export const handler: APIGatewayProxyHandler = async (event) => {
    const params = {
        TableName: process.env.TABLE_NAME||'',
};
    var items = await db.scan(params).promise()

    console.log(JSON.stringify(items))
    return {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        }
    }
}