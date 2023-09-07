const STAGE = process.env.STAGE;
const LOCALSTACK_ENDPOINT = process.env.LOCALSTACK_ENDPOINT;

export const getDynamoDbEndpoint = () => {
  console.debug(`STAGE: ${STAGE}`);

  if (STAGE === 'local') {
    console.debug(`ddb endpoint: ${LOCALSTACK_ENDPOINT}`);
    return LOCALSTACK_ENDPOINT;
  }
  console.debug(`ddb endpoint: default`);

  return undefined;
};
