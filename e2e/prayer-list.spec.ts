import { test, expect } from '@playwright/test';

test('verify prayer list functionality', async ({ page }) => {
  // Navigate and clear storage to ensure clean state
  await page.goto('/prayer-list');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  // Add items
  const inputField = page.getByPlaceholder('Add a new prayer item...');
  await expect(inputField).toBeVisible({ timeout: 10000 });

  await inputField.fill('My First Prayer');
  await page.getByRole('button', { name: 'Add item' }).click();

  await inputField.fill('My Second Prayer');
  await page.getByRole('button', { name: 'Add item' }).click();

  // Verify items are added
  await expect(page.getByText('My First Prayer')).toBeVisible();
  await expect(page.getByText('My Second Prayer')).toBeVisible();

  // Archive "My First Prayer"
  // MuiPaper-root is the container for the item
  const itemRow = page.locator('.MuiPaper-root').filter({ has: page.getByText('My First Prayer') });
  await itemRow.getByRole('checkbox').click();

  // Wait for it to disappear
  await expect(page.getByText('My First Prayer')).not.toBeVisible();

  // Click "Show archived items"
  await page.getByRole('button', { name: 'Show archived items' }).click();

  // Verify "Archived Items" view
  await expect(page.getByText('Archived Items')).toBeVisible();
  await expect(page.getByText('My First Prayer')).toBeVisible();
});
