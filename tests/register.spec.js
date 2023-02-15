import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/register');
});

test.afterEach(async () => {});

test('test', async ({ page }) => {
  await page.fill('input[name=firstname]', 'John');
  await page.fill('input[name=lastname]', 'Doe');
  await page.fill('input[name=email]', 'john.doe@example.com');
  await page.fill('input[name=pnr]', '198012312348');
  await page.fill('input[name=username]', 'johndoe');
  await page.fill('input[name=password]', 'secretpassasdwordrd');
  page.click('button');
  await page.waitForSelector('h1[style="color: green;"]');
  const text = await page.$eval('h1', (testtext) => testtext.textContent);
  //   const successMessage = await page.$eval(
  //     'h1[style="color: green;"]',
  //     (el) => el.textContent,
  //   );
  console.log(`${text}`);
  //   expect(successMessage).toBe('New account created');
});
