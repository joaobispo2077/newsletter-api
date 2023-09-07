import { Table } from 'dynamodb-toolbox';
import { DocumentClient } from './';

export const NewsLetterTable = new Table({
  name: process.env.NEWSLETTER_TABLE_NAME,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient,
});
