import { test, expect, Page } from "@playwright/test";

export const getAuthModalElements = async (page: Page) => {
  const modal = page.getByRole("dialog");
  await expect(modal, "Auth modal should appear").toBeVisible();

  const emailInput = page.getByTestId("email");
  const passwordInput = page.getByTestId("password");
  const submitButton = modal.getByRole("button", { name: /войти/i });

  await expect(emailInput, "Email input should be visible").toBeVisible();
  await expect(passwordInput, "Password input should be visible").toBeVisible();
  await expect(submitButton, "Submit button should be visible").toBeVisible();

  return {
    modal,
    emailInput,
    passwordInput,
    submitButton,
  };
};

test.describe("Auth Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const openButton = page.getByRole("button", { name: /войти/i });
    await expect(openButton, "Auth button should be visible").toBeVisible();
    await openButton.click();
    const modal = page.getByRole("dialog");
    await expect(modal, "Auth modal should appear").toBeVisible();
  });

  test("should toggle modal", async ({ page }) => {
    const { modal } = await getAuthModalElements(page);
    await expect(modal).toHaveScreenshot();
    await modal.click({ position: { x: -10, y: -10 } });
    await expect(modal).toBeHidden();
  });

  test("should allow successful login", async ({ page }) => {
    const { emailInput, passwordInput, submitButton, modal } =
      await getAuthModalElements(page);
    await emailInput.fill("test@mail.ru");
    await passwordInput.fill("Ab123123");
    await submitButton.click();

    await expect(modal.getByRole("button", { name: /выйти/i })).toBeVisible();
    await expect(page.getByText("Вы авторизованы")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    const { emailInput, submitButton } = await getAuthModalElements(page);

    const emailLabel = page.getByTestId("email-label");
    await emailInput.fill("Проверка почты");

    const errorText = page.getByText(/Почта невалидна/i);
    await expect(errorText).toBeVisible();
    await expect(errorText).toHaveCSS("color", "rgb(224, 4, 4)");
    await expect(
      submitButton,
      "Submit button should be disabled"
    ).toBeDisabled();

    await expect(emailLabel).toHaveScreenshot();
  });

  test("should show validation error for invalid password", async ({
    page,
  }) => {
    const { passwordInput, submitButton } = await getAuthModalElements(page);

    const passwordLabel = page.getByTestId("password-label");
    await passwordInput.fill("123");

    const errorText = page.getByText(/Введите более подходящий пароль/i);
    await expect(errorText).toBeVisible();
    await expect(errorText).toHaveCSS("color", "rgb(224, 4, 4)");
    await expect(
      submitButton,
      "Submit button should be disabled"
    ).toBeDisabled();

    await expect(passwordLabel).toHaveScreenshot();
  });
});
