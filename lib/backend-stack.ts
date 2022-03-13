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
      partitionKey: { name: 'user_id', type: dynamodb.AttributeType.STRING },
    });

    const teacherTable = new dynamodb.Table(this, 'Teacher', {
      partitionKey: { name: 'teacher_id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'password', type: dynamodb.AttributeType.STRING }
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

    const createTeacherLabmda = new lambda.Function(this, 'CreateTeacher', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'createTeacher.handler',
      environment: {
        TABLE_NAME: teacherTable.tableName,
        PRIMARY_KEY: 'teacher_id',
      },
    });

    const setUserLambda = new lambda.Function(this, 'setUser', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'setUser.handler',
      environment: {
        TABLE_NAME: userTable.tableName,
        PRIMARY_KEY: 'user_id',
      },
    })

    const getUserByIdLambda = new lambda.Function(this, 'GetUserById', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getUserById.handler',
      environment: {
        TABLE_NAME: userTable.tableName,
        PRIMARY_KEY: 'user_id',
        SORT_KEY: 'password',
      },
    })
    
    const getTeacherLambda = new lambda.Function(this, 'GetTeacher', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getTeacher.handler',
      environment: {
        TABLE_NAME: teacherTable.tableName,
        PRIMARY_KEY: 'teacher_id',
        SORT_KEY: 'password',
      },
    })

    const getTeachersLambda = new lambda.Function(this, 'GetTeachers', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getTeachers.handler',
      environment: {
        TABLE_NAME: teacherTable.tableName,
        PRIMARY_KEY: 'teacher_id',
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
    userTable.grantReadWriteData(setUserLambda);
    teacherTable.grantReadWriteData(createTeacherLabmda);
    teacherTable.grantReadData(getTeachersLambda);
    cardSetTable.grantReadData(getAllCardSetLambda);
    teacherTable.grantReadWriteData(createTeacherLabmda);
    teacherTable.grantReadData(getTeachersLambda);
    teacherTable.grantReadData(getTeacherLambda);
    userTable.grantReadWriteData(setUserLambda);


    // API Gateway

    const api = new apigateway.RestApi(this, 'api', {
      description: 'API for FlashCard Web App',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS
      },
    })

    const userEndpoint = api.root.addResource('user')   // /user endpiont
    userEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getUserByIdLambda, { proxy: true }))

    // return a list of teachers for student to select
    const getTeachersEndpoint = api.root.addResource('getTeachers') // /getTeachers endpoint
    getTeachersEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getTeachersLambda, { proxy: true }))

    // teacher login queries
    const getTeacherEndpoint = api.root.addResource('getTeacher') // /getTeachers endpoint
    getTeacherEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getTeacherLambda, { proxy: true }))

    const createUserEndpoint = api.root.addResource('createUser')   // /createUser endpiont
    createUserEndpoint.addMethod('POST', new apigateway.LambdaIntegration(createUserLambda, { proxy: true }))

    const setUserEndPoint = api.root.addResource('setUser')   // /setUser endpiont
    setUserEndPoint.addMethod('POST', new apigateway.LambdaIntegration(setUserLambda, { proxy: true }))

    const createTeacherEndpoint = api.root.addResource('createTeacher')   // /createTeacher endpiont
    createTeacherEndpoint.addMethod('POST', new apigateway.LambdaIntegration(createTeacherLabmda, { proxy: true }))

    const cardsetsEndpoint = api.root.addResource('cardsets') // /cardsets endpoint
    cardsetsEndpoint.addMethod('GET', new apigateway.LambdaIntegration(getAllCardSetLambda, { proxy: true }))

  }
}
