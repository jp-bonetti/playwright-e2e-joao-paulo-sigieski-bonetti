import { expect, test } from '@playwright/test';

test.describe('QA Playground - validação de formulários', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/forms');
  });

  test('FRM_002 - exibe erros nos campos obrigatórios', async ({ page }) => {
    await test.step('Enviar o formulário de dados pessoais sem preencher os campos', async () => {
      await page.getByRole('button', { name: 'Save Details' }).click();
    });

    await test.step('Verificar os erros dos campos obrigatórios', async () => {
      await expect(page.getByTestId('error-first-name')).toBeVisible();
      await expect(page.getByTestId('error-gender')).toBeVisible();
    });
  });

  test('FRM_006 - exibe erro quando as senhas são diferentes', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('wrong456');
    await page.getByTestId('submit-form-btn').click();

    await expect(page.getByTestId('error-confirm-password')).toHaveText(
      'Passwords do not match.'
    );
  });

  test('FRM_007 - exige a aceitação dos termos', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('secret123');
    await page.getByTestId('submit-form-btn').click();

    await expect(page.getByTestId('checkbox-terms')).not.toBeChecked();
    await expect(page.getByTestId('form-success-msg')).not.toBeVisible();
  });

  test('FRM_009 - limpa os campos ao redefinir o formulário', async ({ page }) => {
    await page.locator('#password').fill('secret123');
    await page.locator('#confirmPassword').fill('secret123');
    await page.getByRole('button', { name: 'Reset' }).last().click();

    await expect(page.locator('#password')).toBeEmpty();
    await expect(page.locator('#confirmPassword')).toBeEmpty();
  });
});
