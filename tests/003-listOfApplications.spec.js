import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[id=username-input]', 'admin');
  await page.fill('input[id=password-input]', 'admin');
  await page.click('button[id=button-input]');
  const applicationsLink = await page.waitForSelector(
    'a[href="/applications"]',
  );
  await page.waitForTimeout(500);
  await applicationsLink.click();
});

test('displays a list of applications when data is fetched successfully', async ({
  page,
}) => {
  await page.waitForSelector('td', { textContent: '1' });
  const tdElements = await page.$$('td');
  expect(tdElements.length).toBe(8);
  expect(await tdElements[0].textContent()).toBe('1');
  expect(await tdElements[1].textContent()).toBe('test lastname');
  expect(await tdElements[2].textContent()).toBe('Unhandled');
  expect(await tdElements[3].textContent()).toBe('View Details');
  expect(await tdElements[4].textContent()).toBe('2');
  expect(await tdElements[5].textContent()).toBe('test2 lastname2');
  expect(await tdElements[6].textContent()).toBe('Unhandled');
  expect(await tdElements[7].textContent()).toBe('View Details');
});
