import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';

test.describe('Cart', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test('adding items updates the cart badge', async () => {
    await inventory.addToCart(BACKPACK);
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.addToCart(BIKE_LIGHT);
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('removing an item updates the cart badge', async () => {
    await inventory.addToCart(BACKPACK);
    await inventory.removeFromCart(BACKPACK);
    await expect(inventory.cartBadge).toBeHidden();
  });

  test('added item appears in the cart page', async ({ page }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.openCart();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack'
    );
  });
});
