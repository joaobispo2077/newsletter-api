import { failedMessagesService } from '../services/failed-messages-service';

export const handler = async (event, _context, _callback) => {
  try {
    console.info(`Initialized processing of failed messaages from SQS`);
    const promiseResultList = await Promise.allSettled(
      event.Records.map(async (record) => {
        const { messageId } = record;

        return await failedMessagesService.store({
          id: messageId,
          resource: 'reader#unsubscribe',
          message: JSON.stringify(record),
        });
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
