import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BackendStack-User00B015A1-MY1MDK2S4ZNM';
const header = {
    'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};
const NULL_ARRAY = [null, undefined, ""]

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const item = JSON.parse(event.body || '{}');

        if (NULL_ARRAY.includes(item.user_id)) {
            return {
                statusCode: 400,
                headers: header,
                body: '[InvalidRequest] Invalid parameters',
            };
        };

        var params;
        // Setting a teacher
        if (!NULL_ARRAY.includes(item.teacher)) {
            params = {
                TableName: TABLE_NAME,
                Key: {
                    'user_id': item.user_id,
                },
                UpdateExpression: "SET teacher = :t",
                ConditionExpression: "user_id = :u",
                ExpressionAttributeValues: {
                    ":u": item.user_id,
                    ":t": item.teacher
                },
            };
        // Setting Quiz Score
        } else {
            params = {
                TableName: TABLE_NAME,
                Key: {
                    'user_id': item.user_id,
                },
                UpdateExpression: "SET quizzes.#key = :value",
                ConditionExpression: "user_id = :u",
                ExpressionAttributeNames: {
                    "#key": item.quizId
                },
                ExpressionAttributeValues: {
                    ":u": item.user_id,
                    ":value": {correct: item.correct, total: item.total}
                }
            };
        }

        await db.update(params).promise();
    
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