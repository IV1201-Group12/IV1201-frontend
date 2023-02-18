import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test.afterEach(async () => {});

test('it can create an account successfully and display a confirmation message if all fields are entered', async ({
  page,
}) => {
  await page.fill('input[name=firstname]', 'John');
  await page.fill('input[name=lastname]', 'Doe');
  await page.fill('input[name=email]', 'john.doe@example.com');
  await page.fill('input[name=pnr]', '198012312348');
  await page.fill('input[name=username]', 'johndoe');
  await page.fill('input[name=password]', 'secretpassword');
  await page.click('button');
  await page.waitForSelector('h1[style="color: green;"]');
  const successMessage = await page.$eval(
    'h1[style="color: green;"]',
    (el) => el.textContent,
  );
  expect(successMessage).toBe('New account created');
});

test('it displays an appropriate error message if a field is missing', async ({
  page,
}) => {
  await page.fill('input[name=lastname]', 'Doe');
  await page.fill('input[name=email]', 'john.doe@example.com');
  await page.fill('input[name=pnr]', '198012312348');
  await page.fill('input[name=username]', 'johndoe');
  await page.fill('input[name=password]', 'secretpassword');
  await page.click('button');
  await page.waitForSelector('h1[style="color: red;"]');
  const errorMessage = await page.$eval(
    'h1[style="color: red;"]',
    (el) => el.textContent,
  );
  expect(errorMessage).toBe('All fields are required ');
});
