import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import AWSXRay from 'aws-xray-sdk-core';

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const dynamoDbClient = AWSXRay.captureAWSv3Client(new DynamoDBClient({}));

export const DocumentClient = DynamoDBDocumentClient.from(
  dynamoDbClient,
  translateConfig,
);
