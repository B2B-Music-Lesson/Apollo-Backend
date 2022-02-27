import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'


const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-User00B015A1-B1D5X81Q9YMT';

export const handler: APIGatewayProxyHandler = async (event: any = {}): Promise<any> => {
        const params = {
            TableName: TABLE_NAME,
            Item: {
                'user_id': 'fgfg',
                'is_teacher': false,
                'password': 'dgdg'
            }
        };
        
        await db.get(params).promise();

        const item = params.Item;

        // Check if parameters are valid
        if (!(item?.user_id && item?.password && item?.is_teacher)) {
            return {
                statusCode: 400,
                headers: {},
                body: '[InvalidRequest]',
            };
        } else {
            return {
                statusCode: 200,
                body: 'success'
            }
            
        }
    }
