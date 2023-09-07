import { readerRepository } from '../repositories/dynamodb/reader-repository';

const subscribeReader = async ({ name, email, letter }) => {
  const reader = {
    name,
    email,
    is_active: true,
    letter,
  };

  await readerRepository.create(reader);
};

const unsubscribeReader = async ({ email, letter }) => {
  const isReaderAlredyExists = await readerRepository.findByEmail({
    email,
    is_active: true,
    letter,
  });

  if (isReaderAlredyExists) {
    await readerRepository.update({ email, is_active: false });
  } else {
    await readerRepository.create({ email, is_active: false });
  }

  return;
};

export const readerService = {
  subscribeReader,
  unsubscribeReader,
};
