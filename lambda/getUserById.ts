import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'


const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-User00B015A1-B1D5X81Q9YMT';

export const handler: APIGatewayProxyHandler = async (event) => {
    // try {
        const id = event.queryStringParameters ? event.queryStringParameters.user_id: ''
        const params = {
            TableName: TABLE_NAME,
            
        Key: {
            'user_id': id,
           // 'is_teacher': false,
           // 'password': 'dgdg'
        }
    };
    var { Item } = await db.get(params).promise()

        console.log(JSON.stringify(Item))
        return {
            statusCode: 200,
            body: JSON.stringify(Item),
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    // } catch(error) {
    //     return {
    //         statusCode: 500,
    //         body: '[ServerError] '+  JSON.stringify(error),
    //     };
    // }
}
