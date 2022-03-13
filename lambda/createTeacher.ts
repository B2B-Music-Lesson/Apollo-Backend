import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const header = {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'

};
const NULL_ARRAY = [null, undefined, ""]

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const item = JSON.parse(event.body || '{}');
        console.log("table name", process.env.TABLE_NAME)

        // Check if parameters are valid
        if (NULL_ARRAY.includes(item.teacher_id) || NULL_ARRAY.includes(item.password)) {
            return {
                statusCode: 400,
                headers: header,
                body: '[InvalidRequest] Invalid parameters',
            };
        };

        const params = {
            TableName: process.env.TABLE_NAME||'',
            Item: item,
        };
        
        await db.put(params).promise();
    
        return {
            statusCode: 200,
            body: 'success',
            headers: header,
        };

    } catch(error) {
        return {
            statusCode: 500,
            body: '[ServerError] '+  JSON.stringify(error),
            headers: header,
        };
    }
}