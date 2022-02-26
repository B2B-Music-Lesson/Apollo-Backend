import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs';
import { checkServerIdentity } from 'tls';
import { LambdaApplication } from 'aws-cdk-lib/aws-codedeploy';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Dynamo DB
    const userTable = new dynamodb.Table(this, 'User', {
        partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING }
    });

    const cardSetTable = new dynamodb.Table(this, 'CardSet', {
      partitionKey: { name: 'cardset_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'created_on', type: dynamodb.AttributeType.NUMBER }
    })

    // Lambda

    const createUserLambda = new lambda.Function(this, 'CreateUser', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'createUser.handler',
      environment: {
        TABLE_NAME: userTable.tableName,
        PRIMARY_KEY: 'user_id',
      },
    });

    const getUserByIdLambda = new lambda.Function(this, 'GetUserById', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getUserById.handler',
      environment: {
        TABLE_NAME: userTable.tableName,
        PRIMARY_KEY: 'user_id',
      },
    })

    const getAllCardSetLambda = new lambda.Function(this, 'GetAllCardSet', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getAllCardSet.handler',
      environment: {
        TABLE_NAME: cardSetTable.tableName,
        PRIMARY_KEY: 'cardset_id',
        SORT_KEY: 'created_on',
      },
    })

    // Permissions
    userTable.grantReadData(getUserByIdLambda);
    userTable.grantReadWriteData(createUserLambda);
    cardSetTable.grantReadData(getAllCardSetLambda);

    // API Gateway

    const api = new apigateway.RestApi(this, 'api', {
      description: 'API for FlashCard Web App',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS
      },
    })

    const userEndpoint = api.root.addResource('user')   // /user endpiont
    userEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getUserByIdLambda, { proxy: true }))

    const createUserEndpoint = api.root.addResource('createUser')   // /createUser endpiont
    createUserEndpoint.addMethod('POST', new apigateway.LambdaIntegration(createUserLambda, { proxy: true }))

    const cardsetsEndpoint = api.root.addResource('cardsets') // /cardsets endpoint
    cardsetsEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getAllCardSetLambda, { proxy: true }))
  }
}
