const { handler } = require('../../src/handlers/subscribe');

describe('hello', () => {
  it('should respond with a john message', async () => {
    const event = {
      body: {
        name: 'John',
      },
    };

    const response = {
      statusCode: 200,
      event,
    };

    const result = await handler(event);
    expect(result).toEqual(response);
  });
});
