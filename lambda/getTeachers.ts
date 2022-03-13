import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-TeacherA3F6831D-1GB06VA5IG6EV';

export const handler: APIGatewayProxyHandler = async (event) => {
    const id = event.queryStringParameters ? event.queryStringParameters.user_id : ''
    
    const params = {
        TableName: TABLE_NAME,

        Key: {
            'teacher_id': id,
        }
    };
    var items = await db.scan(params).promise()

    console.log(JSON.stringify(items))
    return {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }
}