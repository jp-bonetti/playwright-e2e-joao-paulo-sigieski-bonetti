import { expect, test } from '@playwright/test';

test.describe('QA Playground - form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/forms');
  });

  test('FRM_002 - required fields display errors', async ({ page }) => {
    await test.step('Submit the personal details form empty', async () => {
      await page.getByRole('button', { name: 'Save Details' }).click();
    });
    await expect(page.getByTestId('error-first-name')).toBeVisible();
    await expect(page.getByTestId('error-gender')).toBeVisible();
  });

  test('FRM_006 - mismatched passwords display an error', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('wrong456');
    await page.getByTestId('submit-form-btn').click();
    await expect(page.getByTestId('error-confirm-password')).toHaveText('Passwords do not match.');
  });

  test('FRM_007 - terms are required', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('secret123');
    await page.getByTestId('submit-form-btn').click();
    await expect(page.getByTestId('checkbox-terms')).not.toBeChecked();
    await expect(page.getByTestId('form-success-msg')).not.toBeVisible();
  });

  test('FRM_009 - reset clears account inputs', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('secret123');
    await page.getByRole('button', { name: 'Reset' }).last().click();
    await expect(page.locator('#password')).toBeEmpty();
    await expect(page.locator('#confirmPassword')).toBeEmpty();
  });
});
