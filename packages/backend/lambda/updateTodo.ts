import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { Todo } from "../../shared/models/todo";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  const id = event.pathParameters?.id;
  const body = event.body ? JSON.parse(event.body) : undefined;

  try {
    if (!id) throw new Error("id is not specified");
    if (!body) throw new Error("request body is undefined");

    const data = await docClient
      .update({
        TableName: process.env.TODO_TABLE!,
        Key: { userId, id },
        UpdateExpression: "SET completed = :completed",
        ExpressionAttributeValues: {
          ":completed": body.completed,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    const attributes = data.Attributes as Todo;

    return {
      statusCode: 200,
      body: JSON.stringify(attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
