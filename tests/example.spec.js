const { test, expect } = require('@playwright/test');

// test.beforeEach(async () => {
//   await applicationsRoute(page);
// });

test('landing page has title', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'This is a landing page' }),
  ).toBeVisible();
});

// const applicationsRoute = (page) =>
//   page.route('**/applications', (route) => {
//     route.fulfill({
//       body: JSON.stringify([
//         {
//           status: 'Rejected',
//           applicant: { firstname: 'Edvin', lastname: 'Alvaeus' },
//         },
//       ]),
//     });
//   });

test('can display existing applications', async ({ page }) => {
  await page.route('**/applications', (route) => {
    route.fulfill({
      body: JSON.stringify([
        {
          status: 'Rejected',
          applicant: { firstname: 'Edvin', lastname: 'Alvaeus' },
        },
      ]),
    });
  });
  await page.goto('/applications');
  const firstname = page.getByText('Edvin');
  const lastname = page.getByText('Alvaeus');
  await expect(firstname).toBeVisible();
  await expect(lastname).toBeVisible();
});
