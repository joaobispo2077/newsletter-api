## Notes about commands/endpoints/sites that show up when I developed this project

Lambda

https://firecracker-microvm.github.io

---

You can create project with boilerplate ES6 using [SG webpack template](https://github.com/serverless-guru/templates/tree/master/sls-webpack) or sls template using command bellow

```bash
serverless create --template aws-nodejs-ecma-script --path .
```

---

You can visualize your local AWS running using localstack dashboard: https://app.localstack.cloud/inst/%3Aiid/status

You can check status of local stack resources on endpoint: http://localhost:4566/health

---

You can list topics using awslocal command bellow:

```bash
awslocal sns list-topics
```

You can publish a message on SNS topic local using command bellow:

```bash

awslocal sns publish --topic-arn "arn:aws:sns:us-east-1:000000000000:newsletter-service-local-SubscribeNewsTopic-e2bfc22d" --message "{\"name\":\"John Doe\",\"email\":\"john.doe@gmail.com\"}"

awslocal sns publish --topic-arn "arn:aws:sns:us-east-1:000000000000:newsletter-service-local-UnsubscribeNewsTopic-4c70d979" --message "{\"email\":\"john.doe@gmail.com\"}"
```

Command to rebuild and recreate localstack resources:

```bash
docker compose up -d --build --force-recreate
```

---

You can handle failed messages on SQS using DLQ (Dead Letter Queue) and redrive policy. You can check more details on link bellow:

https://www.serverless.com/blog/improved-sqs-batch-error-handling-with-aws-lambda
