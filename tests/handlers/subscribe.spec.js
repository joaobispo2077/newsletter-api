const { handler } = require('../../src/handlers/subscribe');
const { readerService } = require('../../src/services/readerService');

jest.mock('../../src/services/readerService');

describe('hello', () => {
  it('should respond with a empty', async () => {
    readerService.subscribeReader.mockResolvedValue();

    const event = {
      body: JSON.stringify({
        message: 'Subscribed',
      }),
    };

    const response = {
      statusCode: 200,
      ...event,
    };

    const result = await handler(event);
    expect(result).toEqual(response);
  });
});
