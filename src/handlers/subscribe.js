export const handler = async (event, _context, _callback) => {
  return {
    statusCode: 200,
    event,
  };
};
