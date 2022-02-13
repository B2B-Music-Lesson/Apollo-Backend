import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async function (event) {
    return {
        body: JSON.stringify({
            user_id: 'bogey',
            password: 'yomamma',
            is_teacher: false,
            card_sets: [],
            sets_num: 0
        }),
        statusCode: 200
    }
}