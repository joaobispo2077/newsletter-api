import { FailedMessagesModel } from './models';

const create = async ({ message, resource, id }) => {
  console.debug(`Creating failed message by id ${id}`);
  const failedMessage = {
    message,
    id,
    resource,
  };

  await FailedMessagesModel.put(failedMessage);
  console.debug(`Reader created`);
};

export const failedMessageRepository = {
  create,
};
