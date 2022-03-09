# Fullstack Typescript Todo App

yarn workspaces monorepo project

- ./
  - packages
    - frontend
    - backend
    - shared

## frontend

frontend app built with Next.js using [yarn create next-app --example with-jest --typescript](https://nextjs.org/docs/testing#jest-and-react-testing-library)

- UI Styling: [Chakra UI](https://chakra-ui.com/guides/getting-started/nextjs-guide)
- Global State: [recoil](https://recoiljs.org/docs/introduction/getting-started)
- API mocking: [msw](https://github.com/vercel/next.js/tree/canary/examples/with-msw)
- API Data fetching: [swr](https://swr.vercel.app/)
- 認証: [@auth0/auth0-react](https://github.com/auth0/auth0-react)

## Backend

AWS ingrastructure built with AWS CDK and serverless REST API application

- AWS CDK (Typescript)
- Amazon API Gateway
- AWS Lambda (Typescript)
- Amazon Dynamodb
