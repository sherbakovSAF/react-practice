import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithStore } from "../helpers/test-utils";
import AuthModal from "./AuthModal";

describe("AuthModal", () => {
  beforeEach(() => {
    window.HTMLDialogElement.prototype.showModal = vi.fn();
    window.HTMLDialogElement.prototype.close = vi.fn();
  });

  it("Show errors invalidate data", () => {
    renderWithStore(<AuthModal onClose={() => {}} />, {
      authModalSlice: { isOpen: true },
    });

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", {
      name: /войти/i,
      hidden: true,
    });

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    expect(screen.getByText(/Почта невалидна/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Введите более подходящий пароль/i)
    ).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
  });
});
