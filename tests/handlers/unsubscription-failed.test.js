import { handler } from '../../src/handlers/unsubscription-failed';
import { failedMessagesService } from '../../src/services/failed-messages-service';

jest.mock('../services/failed-messages-service');

describe('unsubscription-failed handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store failed messages and return batchItemFailures', async () => {
    const event = {
      Records: [
        {
          messageId: '1',
          body: 'message 1',
        },
        {
          messageId: '2',
          body: 'message 2',
        },
      ],
    };
    const storeMock = jest.fn();
    failedMessagesService.store.mockImplementation(storeMock);

    const result = await handler(event);

    expect(storeMock).toHaveBeenCalledTimes(2);
    expect(storeMock).toHaveBeenCalledWith({
      id: '1',
      resource: 'reader#unsubscribe',
      message: JSON.stringify(event.Records[0]),
    });
    expect(storeMock).toHaveBeenCalledWith({
      id: '2',
      resource: 'reader#unsubscribe',
      message: JSON.stringify(event.Records[1]),
    });
    expect(result).toEqual({
      batchItemFailures: [],
    });
  });

  it('should return batchItemFailures for rejected messages', async () => {
    const event = {
      Records: [
        {
          messageId: '1',
          body: 'message 1',
        },
        {
          messageId: '2',
          body: 'message 2',
        },
      ],
    };
    const storeMock = jest.fn();
    failedMessagesService.store.mockImplementation(storeMock);

    storeMock.mockRejectedValueOnce(new Error('Failed to store message 1'));

    const result = await handler(event);

    expect(storeMock).toHaveBeenCalledTimes(2);
    expect(storeMock).toHaveBeenCalledWith({
      id: '1',
      resource: 'reader#unsubscribe',
      message: JSON.stringify(event.Records[0]),
    });
    expect(storeMock).toHaveBeenCalledWith({
      id: '2',
      resource: 'reader#unsubscribe',
      message: JSON.stringify(event.Records[1]),
    });
    expect(result).toEqual({
      batchItemFailures: [
        {
          itemIdentifier: '1',
        },
      ],
    });
  });

  it('should throw an error if failedMessagesService.store throws an error', async () => {
    const event = {
      Records: [
        {
          messageId: '1',
          body: 'message 1',
        },
      ],
    };
    const storeMock = jest.fn();
    failedMessagesService.store.mockImplementation(storeMock);

    const error = new Error('Failed to store message');
    storeMock.mockRejectedValueOnce(error);

    await expect(handler(event)).rejects.toThrow(error);
  });
});
