import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'


const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-User00B015A1-B1D5X81Q9YMT';

export const handler: APIGatewayProxyHandler = async (event) => {
    const id = event.queryStringParameters ? event.queryStringParameters.user_id : ''
    const password = event.queryStringParameters ? event.queryStringParameters.password: ''
        const params = {
            TableName: TABLE_NAME,
            
        Key: {
            'user_id': id,
            'password': password
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
}
