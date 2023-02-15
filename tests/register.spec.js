import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test.afterEach(async () => {});

test('test', async ({ page }, workerInfo) => {
  await page.fill(
    'input[name=firstname]',
    `firstname-${workerInfo.project.name}`,
  );
  await page.fill(
    'input[name=lastname]',
    `lastname-${workerInfo.project.name}`,
  );
  await page.fill(
    'input[name=email]',
    `${workerInfo.project.name}@example.com`,
  );
  await page.fill('input[name=pnr]', `19801231234${workerInfo.workerIndex}`);
  await page.fill(
    'input[name=username]',
    `username-${workerInfo.project.name}`,
  );
  await page.fill('input[name=password]', `pass-${workerInfo.project.name}`);
  await page.click('button');
  await page.waitForSelector('h1[style="color: green;"]');
  const successMessage = await page.$eval(
    'h1[style="color: green;"]',
    (el) => el.textContent,
  );
  expect(successMessage).toBe('New account created');
});
