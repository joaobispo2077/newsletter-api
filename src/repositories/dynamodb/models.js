import { Entity } from 'dynamodb-toolbox';
import { NewsLetterTable } from './tables';

export const ReaderModel = new Entity({
  name: 'Reader',
  attributes: {
    id: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    name: { type: 'string' },
    letter: [
      'sk',
      0,
      {
        type: 'string',
        default: 'main_readers',
      },
    ],
    is_active: { type: 'boolean', default: true },
  },
  table: NewsLetterTable,
});

export const FailedMessagesModel = new Entity({
  name: 'FailedMessages',
  attributes: {
    id: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    message: { type: 'string' },
    resource: [
      'sk',
      0,
      {
        type: 'string',
      },
    ],
  },
  table: NewsLetterTable,
});
