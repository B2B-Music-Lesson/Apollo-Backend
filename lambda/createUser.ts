import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'User';



export const handler: APIGatewayProxyHandler = async (event: any={}) : Promise<any> => {
    try {
        const item = typeof event.body === 'object' ? event.body : JSON.parse(event.body);
        //TODO: check if the username is already being used

        // Check if parameters are valid
        if (item?.user_id && item?.password && item?.is_teacehr) {
            return {
                statusCode: 400,
                headers: {},
                body: JSON.stringify('[InvalidRequest]'),
            };
        };

        const params = {
            TableName: TABLE_NAME,
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