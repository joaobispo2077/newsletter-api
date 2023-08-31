export const handler = async (_event, _context, _callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Subscribed',
    }),
  };
};
