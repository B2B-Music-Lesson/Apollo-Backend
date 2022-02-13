import { Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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
  }
}
