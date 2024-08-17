import { expect, test } from "@playwright/test";

test("Registration", async ({ page }) => {
  const random = () => "test_" + Math.random().toString(36).substring(2, 8);

  const name = random();
  const email = random() + "@test.com";
  const password = random();

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByLabel("Name").click();
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create Account" }).click();
  await page.waitForURL("**/todos");
  expect(page.url()).toBe("http://localhost:5173/todos");
});

test("Login", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("test@stratagems.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Test123***");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/todos");
  expect(page.url()).toBe("http://localhost:5173/todos");
});
