# Welcome to B2B-Music-Lesson project!

This repository holds a backend for B2B-Music-Lesson that leverages AWS CDK for better deployment process and maintainability. 

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`BackendStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

# Frontend Repository
https://github.com/B2B-Music-Lesson/Frontend

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
