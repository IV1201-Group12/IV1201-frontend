import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
});

test.afterEach(async () => {});

test('it can log in successfully if all fields are entered', async ({
  page,
}) => {
  await page.fill('input[id=username-input]', 'johndoe');
  await page.fill('input[id=password-input]', 'secretpassword');
  await page.click('button[id=button-input]');
  await page.waitForSelector('h1[id=logged-in-message]');
  const loggedInMessage = await page.$eval(
    'h1[id=logged-in-message]',
    (el) => el.textContent,
  );
  expect(loggedInMessage).toBe('Logged in as johndoe');
});

test('it displays an appropriate error message if a field is missing', async ({
  page,
}) => {
  await page.fill('input[id=password-input]', 'secretpassword');
  await page.click('button[id=button-input]');
  await page.waitForSelector('.Toast');
  const errorMessage = await page.$eval('.Toast', (el) => el.textContent);
  expect(errorMessage).toBe('All fields are required');
});

test('it displays an appropriate error message if the credentials are not correct', async ({
  page,
}) => {
  await page.fill('input[id=username-input]', 'johndoe');
  await page.fill('input[id=password-input]', 'secretpassword123');
  await page.click('button[id=button-input]');
  await page.waitForSelector('.Toast');
  const errorMessage = await page.$eval('.Toast', (el) => el.textContent);
  expect(errorMessage).toBe('No user with those credentials');
});
