# Batch Item Failures Try Catch Example

```javascript
import { readerService } from '../services/reader-service';

export const handler = async (event, _context, _callback) => {
  try {
    console.info(`Initialized processing of messages from SQS`);

    const batchItemFailures = [];

    for (let index = 0; index < event.Records.length; index++) {
      const record = event.Records[index];
      const { body } = record;
      const { Message } = JSON.parse(body);
      const { name, email, letter } = JSON.parse(Message);

      try {
        // this line you can replace with your own logic
        await readerService.subscribeReader({ name, email, letter });
      } catch (error) {
        console.error(`[${index}] Message rejected by reason: ${error}`);
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }

    console.info(`Finished processing of messages from SQS`);
    console.info(`Number of messages with errors: ${batchItemFailures.length}`);

    return {
      batchItemFailures,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
```

# Batch Item Failures Promise.allSettled Example

```javascript
import { readerService } from '../services/reader-service';

export const handler = async (event, _context, _callback) => {
  try {
    console.info(`Initialized processing of messaages from SQS`);
    const promiseResultList = await Promise.allSettled(
      event.Records.map(async (record) => {
        const { body } = record;
        const { Message } = JSON.parse(body);
        const { name, email, letter } = JSON.parse(Message);

        // this line you can replace with your own logic
        return await readerService.subscribeReader({ name, email, letter });
      }),
    );

    const failedMessageIdList = promiseResultList.reduce(
      (acc, current, index) => {
        if (current.status === 'rejected') {
          console.error(
            `[${index}] Message rejected by reason: ${current.reason}`,
          );
          acc.push(event.Records[index].messageId);
        }

        return acc;
      },
      [],
    );

    const batchItemFailures = failedMessageIdList.map((failedMessageId) => ({
      itemIdentifier: failedMessageId,
    }));
    console.info(`Finished processing of messaages from SQS`);
    console.info(`Number of messages with errors: ${batchItemFailures.length}`);

    return {
      batchItemFailures,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
```
