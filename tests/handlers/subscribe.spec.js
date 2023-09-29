import { handler } from '@src/handlers/subscribe';
import { readerService } from '@src/services/reader-service';

jest.mock('@src/services/reader-service');

describe('subscribe handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should subscribe readers and return empty batchItemFailures', async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            Message: JSON.stringify({
              name: 'John Doe',
              email: 'johndoe@example.com',
              letter: 'Lorem ipsum dolor sit amet',
            }),
          }),
        },
      ],
    };

    const context = {};
    const callback = jest.fn();

    readerService.subscribeReader.mockResolvedValueOnce();

    const result = await handler(event, context, callback);

    expect(readerService.subscribeReader).toHaveBeenCalledTimes(1);
    expect(readerService.subscribeReader).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      letter: 'Lorem ipsum dolor sit amet',
    });
    expect(result).toEqual({ batchItemFailures: [] });
  });

  it('should handle failed subscriptions and return batchItemFailures', async () => {
    const event = {
      Records: [
        {
          messageId: 'message-id-1',
          body: JSON.stringify({
            Message: JSON.stringify({
              name: 'John Doe',
              email: 'johndoe@example.com',
              letter: 'Lorem ipsum dolor sit amet',
            }),
          }),
        },
        {
          messageId: 'message-id-2',
          body: JSON.stringify({
            Message: JSON.stringify({
              name: 'Jane Doe',
              email: 'janedoe@example.com',
              letter: 'Duis aute irure dolor in reprehenderit',
            }),
          }),
        },
      ],
    };
    const context = {};
    const callback = jest.fn();

    readerService.subscribeReader.mockRejectedValue(new Error('Invalid email'));

    const result = await handler(event, context, callback);

    expect(readerService.subscribeReader).toHaveBeenCalledTimes(2);
    expect(readerService.subscribeReader).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      letter: 'Lorem ipsum dolor sit amet',
    });
    expect(readerService.subscribeReader).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      letter: 'Duis aute irure dolor in reprehenderit',
    });
    expect(result).toEqual({
      batchItemFailures: [
        { itemIdentifier: 'message-id-1' },
        { itemIdentifier: 'message-id-2' },
      ],
    });
  });
});
