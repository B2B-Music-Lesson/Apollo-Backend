import { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async function (event) {
    return {
        body: JSON.stringify({
            cardset_id: 'cardset_id_test',
            created_on: new Date().getTime(),
            cards: [],
            card_num: 0
        }),
        statusCode: 200
    }
}