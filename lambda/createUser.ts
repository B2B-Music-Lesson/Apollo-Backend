import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
const db = new AWS.DynamoDB.DocumentClient();
export const handler: APIGatewayProxyHandler = async (event: any={}) : Promise<any> => {
    try {
        //TODO: is frontend going to just send `event`?
        const item = JSON.parse(event.body || '{}');
        console.log('body', event.body);
        console.log('item', item);
        console.log("table name", process.env.TABLE_NAME);
        // Check if parameters are valid
        if (!((item === null || item === void 0 ? void 0 : item.user_id) && (item === null || item === void 0 ? void 0 : item.password))) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                },
                body: '[InvalidRequest]',
            };
        }
        ;
        const params = {
            TableName: process.env.TABLE_NAME || '',
            Item: item,
        };
        await db.put(params).promise();
        return {
            statusCode: 200,
            body: 'success',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            }
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: '[ServerError] ' + JSON.stringify(error),
        };
    }
}