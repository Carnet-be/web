import { test, expect } from "@playwright/test";


test.describe('New Shop', () => {
    test('should render New Shop Component correctly', async ({ page }) => {
        await page.goto('http://localhost:8000/new-shop');

        await expect(page.getByRole('heading', { name: 'Create a Shop' })).toBeVisible();
        await expect(page.locator('input[name="shopName"]')).toBeVisible();
        await expect(page.locator('textarea[name="shopDescription"]')).toBeVisible();
        await expect(page.locator('input[name="shopEmail"]')).toBeVisible();
        await expect(page.locator('input[name="shopPhoneNumber"]')).toBeVisible();
        await expect(page.locator('input[name="shopAdress"]')).toBeVisible();

        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });
});