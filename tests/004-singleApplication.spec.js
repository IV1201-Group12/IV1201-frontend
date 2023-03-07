import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[id=username-input]', 'admin');
  await page.fill('input[id=password-input]', 'admin');
  await page.click('button[id=button-input]');
  await page.waitForSelector('a[href="/applications"]');
  await page.waitForTimeout(3000);
  await page.goto('/applications/1');
});

test('displays all information correct', async ({ page }) => {
  await page.waitForSelector('#save');
  const h1Elements = await page.$$('h1');
  await page.waitForTimeout(3000);
  const currentValue = await page.$eval('#status', (el) => el.value);
  expect(await h1Elements[0].textContent()).toBe('First name: test');
  expect(await h1Elements[1].textContent()).toBe('Last name: lastname');
  expect(await h1Elements[2].textContent()).toBe('Email: email@email.com');
  expect(await h1Elements[3].textContent()).toBe('Person number: 123456789019');
  expect(await h1Elements[4].textContent()).toBe('Competence: ticket sales');
  expect(await h1Elements[5].textContent()).toBe('Years of experience: 2');
  expect(await h1Elements[6].textContent()).toBe('Available from: 2024-05-01');
  expect(await h1Elements[7].textContent()).toBe('Available to: 2024-06-01');
  expect(currentValue).toBe('unhandled');
});

test('changing the status updates it', async ({ page }) => {
  const saveButton = await page.waitForSelector('#save');
  const select = await page.waitForSelector('#status');
  await select.selectOption('accepted');
  await saveButton.click();
  const child = await page.locator('td', { hasText: '1' });
  const parent = await page.locator('tr', { has: child });
  const statusText = parent.locator('td', { hasText: 'Accepted' });
  await expect(statusText).toBeVisible();
});

test('changing the status while it is concurrently changed by someone else displays an error message', async ({
  page,
  browser,
}) => {
  const saveButton = await page.waitForSelector('#save');
  const select = await page.waitForSelector('#status');
  await select.selectOption('accepted');

  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto('/login');
  await newPage.fill('input[id=username-input]', 'admin');
  await newPage.fill('input[id=password-input]', 'admin');
  await newPage.click('button[id=button-input]');
  await newPage.waitForSelector('a[href="/applications"]');
  await newPage.waitForTimeout(500);
  await newPage.goto('/applications/1');
  const saveButtonTwo = await newPage.waitForSelector('#save');
  const selectTwo = await newPage.waitForSelector('#status');

  await saveButton.click();

  await selectTwo.selectOption('rejected');
  await saveButtonTwo.click();
  await newPage.waitForSelector('.Toast');
  const errorMessage = await newPage.$eval('.Toast', (el) => el.textContent);
  expect(errorMessage).toBe(
    'The current application is being modified by another user',
  );
});
