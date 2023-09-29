import { handler } from '@src/handlers/unsubscribe';
import { readerService } from '@src/services/reader-service';

jest.mock('@src/services/reader-service');

describe('unsubscribe handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should unsubscribe reader for each message in the event', async () => {
    const email = 'test@example.com';
    const letter = 'newsletter';
    const messageId = '123';
    const body = JSON.stringify({ email, letter });
    const event = {
      Records: [
        {
          body: JSON.stringify({ Message: body }),
          messageId,
        },
      ],
    };

    await handler(event);

    expect(readerService.unsubscribeReader).toHaveBeenCalledWith({
      email,
      letter,
    });
  });

  it('should return list of failed message ids', async () => {
    const email = 'test@example.com';
    const letter = 'newsletter';
    const messageId = '123';
    const body = JSON.stringify({ email, letter });
    const event = {
      Records: [
        {
          body: JSON.stringify({ Message: body }),
          messageId,
        },
      ],
    };
    const error = new Error('Failed to unsubscribe reader');
    readerService.unsubscribeReader.mockRejectedValueOnce(error);

    const result = await handler(event);

    expect(result.batchItemFailures).toEqual([{ itemIdentifier: messageId }]);
  });

  it('should log error and rethrow if an error occurs', async () => {
    const error = 'event.Records.map is not a function';

    const fakeErrorPayload = 12234556;
    await expect(handler({ Records: fakeErrorPayload })).rejects.toThrow(error);
  });
});
