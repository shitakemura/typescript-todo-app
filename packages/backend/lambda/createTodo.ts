import {
  APIGatewayProxyEventV2WithJWTAuthorizer,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../shared/models/todo";

const docClient = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const userId = event.requestContext.authorizer.jwt.claims.sub as string;
  const id = uuidv4();
  const body = event.body ? JSON.parse(event.body) : undefined;

  try {
    if (!body) throw new Error("request body is undefined");

    const putItem: Todo = { userId, id, ...body, completed: false } as Todo;
    await docClient
      .put({ TableName: process.env.TODO_TABLE!, Item: putItem })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(putItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
