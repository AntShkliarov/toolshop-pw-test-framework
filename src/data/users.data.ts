import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});

export const validTestUser = {
  email: process.env.TEST_USER_EMAIL || 'test@example.com',
  password: process.env.TEST_USER_PASSWORD || 'changeme',
};
