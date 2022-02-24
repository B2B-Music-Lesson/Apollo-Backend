import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs';
import { checkServerIdentity } from 'tls';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Dynamo DB tables
    const userTable = new dynamodb.Table(this, 'User', {
        partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING }
    });

    const user_cardSet = new dynamodb.Table(this, 'User_CardSet', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER}
    })

    const cardSetTable = new dynamodb.Table(this, 'CardSet', {
      partitionKey: { name: 'cardset_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'created_by', type: dynamodb.AttributeType.STRING }
    })

    const cardTable = new dynamodb.Table(this, 'Card', {
      partitionKey: { name: 'card_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'belongs_to', type: dynamodb.AttributeType.STRING }
    })

    // Lambbbbbbbbbbbbbbbbb-da functions

    const getUserByIdLambda = new lambda.Function(this, 'GetUserById', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getUserById.handler'
    })

     const getCardByIdLambda = new lambda.Function(this, 'GetCardById', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getCardById.handler'
    })

    // API Gateway

    const api = new apigateway.RestApi(this, 'api', {
      description: 'api for the thing',
    })

    const userEndpoint = api.root.addResource('user')   // /user endpiont
    userEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getUserByIdLambda, { proxy: true }))

    const cardsEndpoint = api.root.addResource('cards')
    cardsEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getCardByIdLambda, { proxy: true }))
  }
}
