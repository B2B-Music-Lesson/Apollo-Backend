import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const access = {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
}

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const item = JSON.parse(event.body || '{}');

        console.log('body', event.body);
        console.log("table name", process.env.TABLE_NAME);

        const params = {
            TableName: process.env.TABLE_NAME||'',
            Key: {
                'teacher_id': item.teacher_id,
            }
        };
        var { Item } = await db.get(params).promise()

        if (item?.password !== Item?.password) {
            return {
                statusCode: 403,
                headers: access,
                body: '[Unauthorized Access]',
            };
        }
    
        console.log(JSON.stringify(Item))
        return {
            statusCode: 200,
            body: JSON.stringify(Item),
            headers: access,
        }
    } catch(error) {
        return {
            statusCode: 500,
            body: '[ServerError] '+  JSON.stringify(error),
            headers: access
        };
    }
}
