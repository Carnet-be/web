import { expect, test } from "@playwright/test";

const random = () => "test_" + Math.random().toString(36).substring(2, 8);
const title = random() + "title";
const body = random() + "body";
test("Create", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill("test@stratagems.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Test123***");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("**/todos");
  expect(page.url()).toBe("http://localhost:5173/todos");

  await page.getByText("New Task").click();

  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Body").click();
  await page.getByLabel("Body").fill(body);
  await page.getByLabel("Status").click();
  await page.getByLabel("Todo", { exact: true }).click();
  await page.getByLabel("Label").click();
  await page.getByLabel("Bug").click();
  await page.getByLabel("Priority").click();
  await page.getByLabel("Low").click();
  await page.getByRole("button", { name: "Create toDo" }).click();
  await page.getByTestId(title).waitFor({ state: "visible" });
  expect(page.getByTestId(title)).toHaveText(title);
});
