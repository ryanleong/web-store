import { kebabToText, snakeToText, normalizePrice } from '../string';

describe('utils/string', () => {
  describe('kebabToText', () => {
    it('should convert kebab-case to text', () => {
      expect(kebabToText('hello-world')).toBe('Hello World');
      expect(kebabToText('another-test-case')).toBe('Another Test Case');
    });
  });

  describe('snakeToText', () => {
    it('should convert snake_case to text', () => {
      expect(snakeToText('hello_world')).toBe('Hello World');
      expect(snakeToText('another_test_case')).toBe('Another Test Case');
    });
  });

  describe('normalizePrice', () => {
    it('should normalize prices to 2 decimal places', () => {
      expect(normalizePrice(123.456)).toBe(123.46);
      expect(normalizePrice(987.654321)).toBe(987.65);
    });
  });
});
