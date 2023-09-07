import { failedMessageRepository } from '../repositories/dynamodb/failed-messages-repository';

const store = async ({ message, resource, id }) => {
  const failedMessage = {
    message,
    id,
    resource,
  };

  await failedMessageRepository.create(failedMessage);
};

export const failedMessagesService = {
  store,
};
