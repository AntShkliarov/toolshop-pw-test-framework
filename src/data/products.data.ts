import { faker } from '@faker-js/faker';

export const generateProduct = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  category: faker.commerce.department(),
});
