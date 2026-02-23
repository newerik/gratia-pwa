import { test, expect } from '@playwright/test';

test('verify dynamic language loading', async ({ page }) => {
  await page.goto('/settings');
  // Wait for the specific heading
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

  // Open Language dropdown
  await page.getByLabel('Language').click();

  // Select German
  await page.getByRole('option', { name: 'Deutsch' }).click();

  // Wait for translation to load and update UI
  await expect(page.getByRole('heading', { name: 'Einstellungen' })).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: 'verification/german_settings.png' });
});
