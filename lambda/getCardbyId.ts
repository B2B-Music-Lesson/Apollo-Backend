import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async function (event) {
    return {
        body: JSON.stringify({
            card_id: 'bogey',
            belongs_to :'no one',
            questions: 'what question?',
            choices: [],
            answer: 2,
            image: "url.whatever"
        }),
        statusCode: 200
    }
}