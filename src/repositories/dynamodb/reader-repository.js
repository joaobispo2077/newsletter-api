import { ReaderModel } from './models';

const update = async ({ email, is_active, name, letter = 'main_readers' }) => {
  console.debug(`Updating reader by email ${email}`);
  const reader = {
    id: email,
    name,
    is_active,
    letter,
  };
  await ReaderModel.update(reader);
  console.debug(`Reader updated`);
};

const findByEmail = async ({
  email,
  letter = 'main_readers',
  is_active = false,
}) => {
  console.debug(`Searching reader by email ${email}`);

  const { Item: reader } = await ReaderModel.get({
    id: email,
    is_active,
    letter,
  });
  console.debug(`Reader found ${JSON.stringify(reader)}`);
  return reader;
};

const create = async ({ name, email, is_active, letter = 'main_readers' }) => {
  console.debug(`Creating reader by email ${email}`);
  const reader = {
    name,
    id: email,
    is_active,
    letter,
  };

  await ReaderModel.put(reader);
  console.debug(`Reader created`);
};

export const readerRepository = {
  create,
  findByEmail,
  update,
};
