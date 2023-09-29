const fs = require('fs');
const path = require('path');

function getTestEnvironmentConfig() {
  const pathTestEnv = path.resolve(__dirname, '..', '.env.test');

  const envConfig = fs.readFileSync(pathTestEnv);

  const envConfigLines = envConfig.toString().split('\n');
  const envConfigParsed = envConfigLines.reduce((acc, line) => {
    const [key, value] = line.split('=');
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return envConfigParsed;
}

function injectEnvironmentVariables() {
  const testEnvironmentConfig = getTestEnvironmentConfig();

  Object.entries(testEnvironmentConfig).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

injectEnvironmentVariables();
