const { test, expect } = require('@playwright/test');

test('landing page has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  await expect(
    page.getByRole('heading', { name: 'This is a landing page' }),
  ).toBeVisible();
});
