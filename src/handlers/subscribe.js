import { readerService } from '../services/reader-service';

export const handler = async (event, _context, _callback) => {
  try {
    console.info(`Initialized processing of messaages from SQS`);
    const promiseResultList = await Promise.allSettled(
      event.Records.map(async (record) => {
        const { body } = record;
        const { Message } = JSON.parse(body);
        const { name, email, letter } = JSON.parse(Message);

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
