import { readerService } from '../../src/services/reader-service';
import { readerRepository } from '../../src/repositories/dynamodb/reader-repository';

jest.mock('../repositories/dynamodb/reader-repository');

describe('readerService', () => {
  describe('subscribeReader', () => {
    it('should call readerRepository.create with the correct arguments', async () => {
      const name = 'John Doe';
      const email = 'johndoe@example.com';
      const letter = 'newsletter';

      await readerService.subscribeReader({ name, email, letter });

      expect(readerRepository.create).toHaveBeenCalledWith({
        name,
        email,
        is_active: true,
        letter,
      });
    });
  });

  describe('unsubscribeReader', () => {
    it('should call readerRepository.update with the correct arguments if the reader already exists', async () => {
      const email = 'johndoe@example.com';
      const letter = 'newsletter';
      const is_active = true;

      readerRepository.findByEmail.mockResolvedValueOnce({
        email,
        letter,
        is_active,
      });

      await readerService.unsubscribeReader({ email, letter });

      expect(readerRepository.update).toHaveBeenCalledWith({
        email,
        is_active: false,
      });
    });

    it('should call readerRepository.create with the correct arguments if the reader does not exist', async () => {
      const email = 'johndoe@example.com';
      const letter = 'newsletter';

      readerRepository.findByEmail.mockResolvedValueOnce(null);

      await readerService.unsubscribeReader({ email, letter });

      expect(readerRepository.create).toHaveBeenCalledWith({
        email,
        is_active: false,
        letter,
      });
    });
  });
});
