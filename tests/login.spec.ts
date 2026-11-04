import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Public demo credentials published by the SauceDemo practice site.
const VALID_USER = 'standard_user';
const VALID_PASS = 'secret_sauce';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user lands on the products page', async ({ page }) => {
    await loginPage.login(VALID_USER, VALID_PASS);
    await new InventoryPage(page).expectLoaded();
  });

  test('wrong password shows an error', async () => {
    await loginPage.login(VALID_USER, 'wrong_password');
    await loginPage.expectError(/do not match any user/i);
  });

  test('locked out user is rejected', async () => {
    await loginPage.login('locked_out_user', VALID_PASS);
    await loginPage.expectError(/locked out/i);
  });

  test('empty username is required', async () => {
    await loginPage.login('', VALID_PASS);
    await loginPage.expectError(/Username is required/i);
  });
});
