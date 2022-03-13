import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
console.log("table name", process.env.TABLE_NAME)
export const handler: APIGatewayProxyHandler = async (event) => {
    const id = event.queryStringParameters ? event.queryStringParameters.teacher_id : ''
    const password = event.queryStringParameters ? event.queryStringParameters.password : ''
    const params = {
        TableName: process.env.TABLE_NAME||'',
        Key: {
            'teacher_id': id,
            'password': password,
        }
    };
    var { Item } = await db.get(params).promise()

    console.log(JSON.stringify(Item))
    return {
        statusCode: 200,
        body: JSON.stringify(Item),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }
}
