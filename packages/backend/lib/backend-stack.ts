import { Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpJwtAuthorizer } from "@aws-cdk/aws-apigatewayv2-authorizers-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DynamoDB
    const todoTable = new Table(this, "todo-table", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: { name: "userId", type: AttributeType.STRING },
      sortKey: { name: "id", type: AttributeType.STRING },
    });

    // Lambda
    const commonLambdaProps: Omit<NodejsFunctionProps, "entry"> = {
      handler: "handler",
      environment: {
        // NODE_OPTIONS: "--enable-source-maps",
        TODO_TABLE: todoTable.tableName,
      },
      bundling: {
        // sourceMap: true,
        minify: true,
      },
    };

    const listTodosLambda = new NodejsFunction(this, "list-todos-lambda", {
      entry: path.join(__dirname, "../lambda/listTodos.ts"),
      ...commonLambdaProps,
    });

    const createTodoLambda = new NodejsFunction(this, "create-todo-lambda", {
      entry: path.join(__dirname, "../lambda/createTodo.ts"),
      ...commonLambdaProps,
    });

    const updateTodoLambda = new NodejsFunction(this, "update-todo-lambda", {
      entry: path.join(__dirname, "../lambda/updateTodo.ts"),
      ...commonLambdaProps,
    });

    const deleteTodoLambda = new NodejsFunction(this, "delete-todo-lambda", {
      entry: path.join(__dirname, "../lambda/deleteTodo.ts"),
      ...commonLambdaProps,
    });

    todoTable.grantReadData(listTodosLambda);
    todoTable.grantReadWriteData(createTodoLambda);
    todoTable.grantReadWriteData(updateTodoLambda);
    todoTable.grantReadWriteData(deleteTodoLambda);

    // HTTP API Gateway
    const todoHttpApi = new HttpApi(this, "todo-http-api", {
      corsPreflight: {
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.DELETE,
        ],
        allowOrigins: [
          "http://localhost:3000",
          "https://typescript-todo-app-zeta.vercel.app",
        ],
      },
    });

    // JWT Authorizaer
    const issuer = `${process.env.AUTH0_DOMAIN!}/`;
    const authorizer = new HttpJwtAuthorizer("todo-jwt-authorizer", issuer, {
      jwtAudience: [process.env.AUTH0_API_AUDIENCE!],
    });

    // HTTP Lambda Integration
    const listTodosIntegration = new HttpLambdaIntegration(
      "list-todos-integration",
      listTodosLambda
    );

    const createTodoIntegration = new HttpLambdaIntegration(
      "create-todo-integration",
      createTodoLambda
    );

    const updateTodoIntegration = new HttpLambdaIntegration(
      "update-todo-integration",
      updateTodoLambda
    );

    const deleteTodoIntegration = new HttpLambdaIntegration(
      "delete-todo-integration",
      deleteTodoLambda
    );

    // API Routes
    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [HttpMethod.GET],
      authorizer,
      integration: listTodosIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos",
      methods: [HttpMethod.POST],
      authorizer,
      integration: createTodoIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos/{id}",
      methods: [HttpMethod.PUT],
      authorizer,
      integration: updateTodoIntegration,
    });

    todoHttpApi.addRoutes({
      path: "/todos/{id}",
      methods: [HttpMethod.DELETE],
      authorizer,
      integration: deleteTodoIntegration,
    });

    // CrfOutPut
    new CfnOutput(this, "todo http api endpoint", {
      value: todoHttpApi.apiEndpoint,
    });
  }
}
