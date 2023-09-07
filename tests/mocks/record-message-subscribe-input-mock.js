export const eventRecordsSqsMessagesSubscribeInputMock = [
  {
    body: '{"Type": "Notification", "MessageId": "aeab39b9-0f8b-4742-89e8-b74b752326ee", "TopicArn": "arn:aws:sns:us-east-1:000000000000:newsletter-service-local-SubscribeNewsTopic-0555d062", "Message": "{\\"name\\":\\"John Doe\\",\\"email\\":\\"john.doe@gmail.com\\"}", "Timestamp": "2023-09-06T18:15:52.404Z", "SignatureVersion": "1", "Signature": "EXAMPLEpH+..", "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0000000000000000000000.pem", "UnsubscribeURL": "http://localhost:4566/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:000000000000:newsletter-service-local-SubscribeNewsTopic-0555d062:5901522a-8abc-4471-965d-d4c569cf6868"}',
    receiptHandle:
      'ZDZmZGM4NjMtMTk3Mi00NzRjLWJmZmQtOGU4YWI3YjRjMzRiIGFybjphd3M6c3FzOnVzLWVhc3QtMTowMDAwMDAwMDAwMDA6bmV3c2xldHRlci1hcGktbG9jYWwtc3Vic2NyaWJlLW5ld3MtcXVldWUgY2JlNzg5ODgtNDNjNi00NjQ4LTljZDQtNzU5NjU4ZTExNjE5IDE2OTQwMjQxNTIuNDE5MTM5',
    md5OfBody: 'edc53d405e4dc81e159e33a36b050d26',
    eventSourceARN:
      'arn:aws:sqs:us-east-1:000000000000:newsletter-service-local-subscribe-news-queue',
    eventSource: 'aws:sqs',
    awsRegion: 'us-east-1',
    messageId: 'cbe78988-43c6-4648-9cd4-759658e11619',
    attributes: {
      SenderId: '000000000000',
      SentTimestamp: '1694024152415',
      ApproximateReceiveCount: '1',
      ApproximateFirstReceiveTimestamp: '1694024152419',
    },
    messageAttributes: {},
  },
];
