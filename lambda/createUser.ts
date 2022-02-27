import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-User00B015A1-B1D5X81Q9YMT';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        //TODO: is frontend going to just send `event`?
        const item = JSON.parse(event.body || '{}');

        console.log('body', event.body)
        console.log('item', item)
        
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Item: item,
        };
        
        await db.put(params).promise();
    
        return {
            statusCode: 200,
            body: 'success',
        };

    } catch(error) {
        return {
            statusCode: 500,
            body: '[ServerError] '+  JSON.stringify(error),
        };
    }
}